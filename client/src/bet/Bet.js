import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar } from 'react-bootstrap';

class Bet extends Component {
  render() {
    return (
      <Row>
      <Col xs={12} md={12}>
        <span>PAKISTAN</span>
        <span className="pull-right">INDIA</span>
      </Col>
      <Col xs={12} md={12}>
        <ProgressBar>
          <ProgressBar active bsStyle="success" now={40} key={1} />
          <ProgressBar active now={60} key={2} />
        </ProgressBar>
      </Col>
      </Row>
    );
  }
}

export default Bet;
