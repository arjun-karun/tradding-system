import React, { Component } from "react";
import { 
  Row, Col, PageHeader, ProgressBar, Button, 
  Grid, Table, Form, FormGroup,FormControl, ControlLabel } from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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


  handleFormSubmit() {

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
                          <Form inline>
                              <FormGroup controlId="formInlineName">
                                <FormControl type="text" placeholder="coins" />
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
