import React, { Component } from "react";
import BetContract from "./contracts/Bet.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import { Grid, Row, Col, PageHeader,FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert} from 'react-bootstrap';

import "./App.css";
import Header from "./common/Header";
import Bet from "./bet/Bet";
import AddMatch from "./bet/AddMatch";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      web3: null,
      accounts: null,
      contract: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.load();
  }

  load = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(BetContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      this.setState({ web3, accounts, contract: instance });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  handleFormSubmit(event) {

    event.preventDefault();
    this.setState({ isLoading: true });

    const { accounts, contract } = this.state;
    
    let team1 = event.target.team1.value;
    let team2 = event.target.team2.value;
    let matchname = event.target.matchname.value;

    // const { accounts, contract } = this.state;
    contract.addMatch(matchname,team1,team2, { from: accounts[0] }).then((response) => {
        alert("Match added successfully");
        console.log(response);
        this.setState({ isLoading: false, showAlert: true });
    }).catch((error)=>{
      alert("Something went wrong. Please try later!");
      console.log(error);
      this.setState({ isLoading: false });
    });
  }

  render() {

    return (
      <div>
          <Header/>
          <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      Bet DAPP
                  </PageHeader>
                </Col>
              </Row>

              <Bet contractInstance={this.state.contract}/>

          </Grid>
    </div>
    );
  }
}

export default App;
