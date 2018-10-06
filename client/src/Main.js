import {Component} from "react";
import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import AddMatch from './bet/AddMatch';
import BetContract from "./contracts/Bet.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            web3: null,
            accounts: null,
            contract: null
        }
    }

    componentDidMount = async () => {
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

    renderComponent(Component, routeProps) {
        <Component {...routeProps} />
    }

    render() {
        if (!this.state.web3) {
            return (<div>Loading....</div>);
        }

        return (
            <main>
                <Switch>
                    <Route exact path='/' render={(props) => <Home {...props} main={this.state} />} />
                    <Route path='/addmatch' component={AddMatch}/>
                </Switch>
            </main>
        )
    }
}

export default Main;