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
                 <p>Betty Dapp</p>
             </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/addmatch">
                 <NavItem>Add New Match</NavItem>
                 </LinkContainer>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
