import React, { Component } from "react";
import { Grid, Row, Col, PageHeader,FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert} from 'react-bootstrap';
import Header from "../common/Header";

class CreateSale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showAlert: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

    handleFormSubmit(event) {
      
      event.preventDefault();
      this.setState({ isLoading: true });
      
      let energytype = event.target.energytype.value;
      let units = event.target.units.value;
      let location = event.target.location.value;

      const { accounts, contract } = this.props.main;
      contract.createSale(energytype, units, location,'', { from: accounts[0] }).then((response) => {
          alert("Sale added successfully");
          console.log(response);
          this.setState({ isLoading: false, showAlert: true });
      }).catch((error)=>{
        alert("Something went wrong. Please try later!");
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const {isLoading, showAlert} = this.state;

    return (
         <div>
          <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      Sell your power
                  </PageHeader>
                </Col>
              </Row>
      <div>
      <Row>
        <br/>
        <Col xs={12} md={12}>
        </Col>
          <Col xs={6} md={6}>
          <form onSubmit={this.handleFormSubmit}>
              <FormGroup
                controlId="formBasicText"
                validationState=""
              >
                <ControlLabel>Energy type</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  name="energytype"
                />
              </FormGroup>


              <FormGroup
                controlId="formBasicText"
                validationState=""
              >
                <ControlLabel>Units</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                  name="units"
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText"
                validationState=""
              >
                <ControlLabel>Location</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  name="location"
                />
              </FormGroup>
            
               <Button
                    type="submit"
                    bsStyle="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Add match'}
                </Button>

          </form>
          </Col>
        </Row>

        <br/>
        <Row bsClass={showAlert? 'show':'hidden'}>
          <Col xs={12} md={12}>
              <Alert bsStyle="success">
                  <strong>Sale </strong> added successfully!!
               </Alert>
          </Col>
      </Row>
      </div>
          </Grid>
    </div>
    )
  }
}

export default CreateSale;