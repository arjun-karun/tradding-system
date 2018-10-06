import React, { Component } from "react";
import "./App.css";
import Header from "./common/Header";
import Main from './Main'

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
          <Header/>
          <Main/>
      </div>
    );
  }
}

export default App;
