import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  /*
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
  };*/

  render() {
    return (
      <div>
        <button onClick={() => this.props.onReset()} className="btn btn-danger">
          Reset
        </button>
        <br></br>
        {Array.from(this.props.counterMap).map(([key, value]) => (
          <React.Fragment>
            <Counter
              counter={{ id: key, value: value }}
              key={key}
              onIncrement={this.props.onIncrement}
              onDelete={this.props.onDelete}
            ></Counter>
            <br></br>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Counters;
