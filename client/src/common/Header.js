import React, { Component } from "react";
import { Navbar,Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
        <Navbar.Brand className="test">
              <LinkContainer to="/">
                  <a href="#brand">ElectroEth</a>
              </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/createsale">
                   <NavItem>Sell Your Power</NavItem>
                 </LinkContainer>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
