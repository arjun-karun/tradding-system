import React, { Component } from "react";
import { Grid, Row, Col, PageHeader,FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert} from 'react-bootstrap';
import Header from "../common/Header";

class AddMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showAlert: false
    }
  }

  render() {
    const {isLoading, showAlert} = this.state;

    return (
         <div>
         <Header/>
          <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <PageHeader>
                      Add New Match
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
                <ControlLabel>Match Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  name="matchname"
                />
              </FormGroup>


              <FormGroup
                controlId="formBasicText"
                validationState=""
              >
                <ControlLabel>Team 1</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                  name="team1"
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText"
                validationState=""
              >
                <ControlLabel>Team 2</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  name="team2"
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
                  <strong>Match </strong> added successfully!!
               </Alert>
          </Col>
      </Row>
      </div>
          </Grid>
    </div>
    )
  }
}

export default AddMatch;