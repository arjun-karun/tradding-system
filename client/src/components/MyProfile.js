import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid, Badge, Table} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BidderFactory from "../contracts/BidderFactory.json";

class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.buyClickHandler = this.buyClickHandler.bind(this);
  }

  componentDidMount() {

  }

  buyClickHandler() {
    const { web3,accounts, contract } = this.props.main;
    const Contract = truffleContract(BidderFactory);
    Contract.setProvider(web3.currentProvider);
    Contract.deployed().then(instance => {
      instance.buyCoin(1, {from: accounts[0], value: web3.utils.toWei('0.00001','ether')}).then(test => {
          console.log(test);
          alert("sucess");
      });
    });
  }


  render() {

    return (
           <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      My Profile <small>Power Coins <Badge bsClass="badge badge-warning">42</Badge></small> <small>Units <Badge bsClass="badge badge-success">234</Badge></small>                  
                  </PageHeader>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12}>
                  <p>
                    <Button bsStyle="primary" onClick={this.buyClickHandler}>Buy Coins</Button>
                  </p>
                </Col>  
              </Row>
          </Grid>
    )
  }
}

export default MyProfile;
