import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid, Badge, Table} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BidderAccount from "../contracts/BidderAccount.json";

class MySales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    }

    this.handleBidLoader = this.handleBidLoader.bind(this);
  }

  componentDidMount() {
    let mySales =[];
    const { web3, accounts, contract } = this.props.main;

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


  handleBidLoader(saleId) {
    const { web3, accounts, contract } = this.props.main;
    const Contract = truffleContract(BidderAccount);
    Contract.setProvider(web3.currentProvider);
    Contract.deployed().then(instance => {

      let bids = [];
       instance.getBidsBySales(saleId).then(bids => {
          console.log(bids);
          bids.map(bidId => {
              bidId = Number(bidId);
              instance.getBidById(bidId).then(bid => {
                  console.log(bid);
                  bids.push(bid);
              });
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
                          {sales.map((sale,key) => <tr><td>{key+1}</td><td>{sale.saleType}</td><td>{Number(sale.units)}</td><td>{sale.location}</td><td><Button onClick={() => this.handleBidLoader(key)}>Bid</Button></td></tr>)}
                        </tbody>
                      </Table>
                </Col>
              </Row>

          </Grid>
    )
  }
}

export default MySales;
