import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
    this.loadSales();
  }

  loadSales() {
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

  handleBetClick(event){
    alert(event.currentTarget.innerText);
  }

  
    renderSales() {

     let sales = [];
      for(let sale of this.state.sales) {

        sales.push(
            <Row>
            <Col xs={12} md={12}>
              <p>{sale.saleType}</p>
            </Col>
            </Row>
          )
      }

      return sales;  
  }

  render() {
    return (
      this.renderSales() 
    )
  }
}

export default Sales;
