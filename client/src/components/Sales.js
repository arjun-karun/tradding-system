import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
  }

  componentDidMount() {
    const contract = this.props.contractInstance;
    contract.getSalesCount().then( salesCount => {
      salesCount = Number(salesCount);
      let sales = []; 
      for(let saleIndex = 0; saleIndex < salesCount; saleIndex++) {
          contract.getSale(saleIndex).then(saleDetails => {
             sales.push(saleDetails);
             this.setState({sales});
          });
      }
    });
  }

  render() {
    return (
      <Grid>
        {this.state.sales.map(sale => <Row><Col xs={12} md={12}><p>{sale.saleType}</p></Col></Row>)}
      </Grid>
    )
  }

}

export default Sales;
