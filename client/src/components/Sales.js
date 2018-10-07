import React, { Component } from "react";
import { 
  Row, Col, PageHeader, ProgressBar, Button, 
  Grid, Table, Form, FormGroup,FormControl, ControlLabel } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BidderAccount from "../contracts/BidderAccount.json";

class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const {web3, accounts, contract} = this.props.main;
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

  handleFormSubmit(event) {
    event.preventDefault();
    let inputElement = event.target.querySelector('input');
    let name = inputElement.name;
    let bidValue = event.target[name]["value"];
    let saleId = name.split("_")[1];
    const {web3, accounts, contract} = this.props.main;
    const Contract = truffleContract(BidderAccount);
    Contract.setProvider(web3.currentProvider);
    Contract.deployed().then(instance => {
      instance.placeBid(saleId, Number(bidValue), {from: accounts[0]}).then(test => {
          console.log(test);
          alert("Bid placed successfully");
      });
    });
  }

  render() {

    if (this.state.sales.length <= 0) {
      return (
          <div>
            Loading....
          </div>
        )
    }

    return (
      <Grid>
          <Row>
          <Col sm={12} md={12}>
              <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Energy Type</th>
                      <th>Units</th>
                      <th>Location</th>
                      <th>Buy</th>
                    </tr>
                    {this.state.sales.map((sale, key) => 
                      <tr>
                        <td>{key + 1}</td>
                        <td>{sale.saleType}</td>
                        <td>{Number(sale.units)}</td>
                        <td>{sale.location}</td>
                        <td>
                          <Form inline onSubmit={this.handleFormSubmit}>
                              <FormGroup controlId="formInlineName">
                                <FormControl type="number" name={"bid_" + key} placeholder="coins" />
                              </FormGroup>{' '}
                              <Button type="submit" bsStyle="danger">Bid</Button>
                            </Form>
                        </td>
                      </tr>
                      )}
                  </thead>
              </Table>
          </Col>
          </Row>
      </Grid>
    )
  }

}

export default Sales;
