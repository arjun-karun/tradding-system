import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button } from 'react-bootstrap';

class Bet extends Component {

  constructor(props) {
    super(props);
  }

  handleBetClick(event){

    alert(event.currentTarget.innerText);
    
  }

  render() {
    return (
      <Row>
      <Col xs={12} md={12}>
        <Button bsStyle="link" onClick={this.handleBetClick}>PAK</Button>
        <Button bsStyle="link" className="pull-right" onClick={this.handleBetClick}>IND</Button>
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
