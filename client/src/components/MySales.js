import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid, Badge, Table} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class MySales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    }
  }

  componentDidMount() {
    const { accounts, contract } = this.props.main;
    let mySales =[];
    contract.getSalesByOwner(accounts[0]).then(salesIdList => {
       salesIdList.map(saleId => {
          saleId = Number(saleId);
          contract.getSale(saleId).then(sales => {
            mySales.push(sales);
            this.setState({sales:mySales});
          });
       });  
    });
  }


  render() {
    let sales = this.state.sales;
    if(sales.length <= 0 ) {
      return (
          <div>
           Loading....
           </div>
        )
    }

    return (
           <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                     My Sales
                  </PageHeader>
                </Col>
              </Row>

              <Row className="top-buffer">
                <Col xs={12} md={12}>
                  <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Units</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sales.map((sale,key) => <tr><td>{key+1}</td><td>{sale.saleType}</td><td>{Number(sale.units)}</td><td>{sale.location}</td></tr>)}
                        </tbody>
                      </Table>
                </Col>
              </Row>

          </Grid>
    )
  }
}

export default MySales;
