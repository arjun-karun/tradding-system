import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BetContract from "../contracts/Bet.json";

class Bet extends Component {

  constructor(props) {
    super(props);


    this.state = {
      matches: [],
      web3: null,
      accounts: null,
      contract: null
    }

  }

 
  componentDidMount() {
    getWeb3().then(web3 => {
        web3.eth.getAccounts().then( accounts => {
           // Get the contract instance.
          const Contract = truffleContract(BetContract);
          Contract.setProvider(web3.currentProvider);
          Contract.deployed().then(instance => {
            this.setState({ web3, accounts, contract: instance}, this.loadMatches);  
          });
        });
    }).catch(error => {
      alert("error loading web3");
      console.log(error);
    });
  }

  loadMatches() {
    const { accounts, contract } = this.state;
    contract.getMatchCount().then( totalMatches => {
      totalMatches = Number(totalMatches);
      let matches = [];
      for(let matchIndex = 0; matchIndex < totalMatches; matchIndex++) {
          contract.getMatch(matchIndex).then(matchDetails => {
             matches.push(matchDetails);
             this.setState({matches});
          });
      }
    });
  }

  renderMatches() {

     let matchRows = [];
      for(let match of this.state.matches) {

        matchRows.push(
            <Row>
            <Col xs={12} md={12}>
              <p>{match.name}</p>
              <Button bsStyle="link" onClick={this.handleBetClick}>{match.team1}</Button>
              <Button bsStyle="link" className="pull-right" onClick={this.handleBetClick}>{match.team2}</Button>
            </Col>
            <Col xs={12} md={12}>
              <ProgressBar>
                <ProgressBar active bsStyle="success" now={40} key={1} />
                <ProgressBar active now={60} key={2} />
              </ProgressBar>
            </Col>
            </Row>
          )
      }

      return matchRows;  
  }


  handleBetClick(event){

    alert(event.currentTarget.innerText);
    
  }

  render() {
    return (
      this.renderMatches()
    )
  }
}

export default Bet;
