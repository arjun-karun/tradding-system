import React, { Component } from "react";
import BetContract from "./contracts/Bet.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import { Grid, Row, Col, PageHeader,FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert} from 'react-bootstrap';

import "./App.css";
import Header from "./common/Header";
import Main from './Main'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      web3: null,
      accounts: null,
      contract: null
    }

    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  render() {

    return (
      <div>
          <Header/>
          <Main/>
      </div>
    );
  }
}

export default App;
