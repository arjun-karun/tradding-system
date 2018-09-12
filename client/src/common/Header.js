import React, { Component } from "react";
import { Navbar,Nav } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
        <Navbar.Brand className="test">
          <a href="#brand">Betty Dapp</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
