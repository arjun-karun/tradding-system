import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid, Badge, Table} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class MyProfile extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { accounts, contract } = this.props.main;
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
                    <Button bsStyle="primary">Buy Coins</Button>
                  </p>
                </Col>  
              </Row>
          </Grid>
    )
  }
}

export default MyProfile;
