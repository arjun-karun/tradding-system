import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid } from 'react-bootstrap';
import truffleContract from "truffle-contract";
import Sales from "./components/Sales";

class Home extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
            <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      Dashboard
                  </PageHeader>
                </Col>
              </Row>
              <Sales main={this.props.main}/>
          </Grid>
    )
  }
}

export default Home;
