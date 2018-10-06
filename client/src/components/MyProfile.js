import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, 
  Grid, Badge, Table,Form, FormGroup,FormControl, 
  ControlLabel } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BidderFactory from "../contracts/BidderFactory.json";

class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins : 0
    };
    this.buyClickHandler = this.buyClickHandler.bind(this);
  }

  componentDidMount() {
    const { web3,accounts, contract } = this.props.main;
    const Contract = truffleContract(BidderFactory);
    Contract.setProvider(web3.currentProvider);
    Contract.deployed().then(instance => {
      instance.getMyCoin({from:accounts[0]}).then(coins => {
          this.setState({coins: Number(coins)});
      });
    });
  }

  buyClickHandler(event) {
    event.preventDefault();
    const { web3,accounts, contract } = this.props.main;
    const Contract = truffleContract(BidderFactory);
    Contract.setProvider(web3.currentProvider);
    let coinsCount = Number(event.target.coins.value);
    let totalValue = web3.utils.toWei('0.00001','ether') * coinsCount;
    Contract.deployed().then(instance => {
      instance.buyCoin(coinsCount, {from: accounts[0], value: totalValue}).then(test => {
          console.log(test);
          alert("coin added successfully");
          let totalCoin = this.state.coins + coinsCount;
          this.setState({coins: totalCoin});
      });
    });
  }


  render() {

    return (
           <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      My Profile <small>Power Coins <Badge bsClass="badge badge-warning">{this.state.coins}</Badge></small> <small>Units <Badge bsClass="badge badge-success">234</Badge></small>                  
                  </PageHeader>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12}>
                  <p>
                    <Form inline onSubmit={this.buyClickHandler}>
                              <FormGroup controlId="formInlineName">
                                <FormControl type="number" name="coins" placeholder="coins" />
                              </FormGroup>{' '}
                              <Button type="submit" bsStyle="danger">Buy Coins</Button>
                            </Form>
                  </p>
                </Col>  
              </Row>
          </Grid>
    )
  }
}

export default MyProfile;
