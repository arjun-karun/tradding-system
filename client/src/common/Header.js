import React, { Component } from "react";
import { Navbar,Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
        <Navbar.Brand className="test">
              <LinkContainer to="/">
                  <a href="#brand">PowerTrade</a>
              </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/mysales">
                   <NavItem>My Sales</NavItem>
                 </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/createsale">
                   <NavItem>Sell Your Power</NavItem>
                 </LinkContainer>
            </Nav>
            <Nav pullRight>
            <NavDropdown eventKey={3} title="My Profile" id="basic-nav-dropdown">
              <LinkContainer to="/myprofile">
                <MenuItem eventKey={3.1}>Profile</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Bids History</MenuItem>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
