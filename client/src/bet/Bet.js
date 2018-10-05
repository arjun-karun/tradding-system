import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BetContract from "../contracts/Bet.json";

class Bet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentWillReceiveProps(newProps) {
    const contract = newProps.contractInstance;
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

  handleBetClick(event){
    alert(event.currentTarget.innerText);
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

  render() {
    return (
      this.renderMatches() 
    )
  }
}

export default Bet;
