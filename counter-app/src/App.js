import React, { Component } from "react";

import "./App.css";
import "./components/counters";
import Counters from "./components/counters";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    counterMap: new Map([
      [1, 2],
      [2, 0],
      [3, 0],
      [4, 0]
    ])
  };

  handleIncrement = id => {
    let newMap = this.state.counterMap;
    newMap.set(id, newMap.get(id) + 1);
    this.setState({ counterMap: newMap });
  };
  handleDecrement = id => {
    let newMap = this.state.counterMap;
    let value = newMap.get(id);
    newMap.set(id, value > 0 ? value - 1 : 0);
    this.setState({ counterMap: newMap });
  };

  handleDelete = id => {
    let newMap = this.state.counterMap;
    newMap.delete(id);
    this.setState({ counterMap: newMap });
  };

  handleReset = () => {
    let newMap = this.state.counterMap;

    Array.from(newMap).forEach(([key, value]) => {
      newMap.set(key, 0);
    });
    this.setState({ counterMap: newMap });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounter={
            Array.from(this.state.counterMap).filter(
              ([key, value]) => value > 0
            ).length
          }
        />
        <main className="container">
          <Counters
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            counterMap={this.state.counterMap}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
