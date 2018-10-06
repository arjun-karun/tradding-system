import React, { Component } from "react";
import { Row, Col, PageHeader, ProgressBar, Button, Grid, Badge, Table} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

class MyProfile extends Component {

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
          contract.getSale(saleId).then(sales => {
            mySales.push(sales);
            this.setState({sales});
          });
       });  
    });
  }


  render() {
    let salesLength = this.state.sales.length;
    return (
           <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      My Profile <small>Power Coins <Badge bsClass="badge badge-warning">42</Badge></small> <small>Units <Badge bsClass="badge badge-success">234</Badge></small>                  
                  </PageHeader>
                  <p>{salesLength}</p>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12}>
                  <p>
                    <Button bsStyle="primary">Buy Coins</Button>
                  </p>
                </Col>  
              </Row>

              <Row className="top-buffer">
                <Col xs={12} md={12}>
                  <p>
                    <strong>Sale History</strong>
                  </p>
                  <p>
                  <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>;
                  </p>
                </Col>
              </Row>


          </Grid>
    )
  }
}

export default MyProfile;
