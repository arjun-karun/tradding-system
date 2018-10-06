import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid } from 'react-bootstrap';
import truffleContract from "truffle-contract";
import Bet from "./bet/Bet";

class Home extends Component {

  constructor(props){
    super(props);
    this.state ={ contract:[]};
  }

  render() {
    return (
            <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      Bet DAPP
                  </PageHeader>
                </Col>
              </Row>
              // <Bet contractInstance={this.state.contract}/>
          </Grid>
    )
  }
}

export default Home;
