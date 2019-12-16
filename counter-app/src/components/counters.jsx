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
    const {
      onIncrement,
      onDelete,
      onReset,
      counterMap,
      onDecrement
    } = this.props;
    return (
      <div>
        <button onClick={() => onReset()} className="btn btn-danger">
          Reset
        </button>
        <br></br>
        {Array.from(counterMap).map(([key, value]) => (
          <React.Fragment key={key}>
            <Counter
              counter={{ id: key, value: value }}
              key={key}
              onIncrement={onIncrement}
              onDelete={onDelete}
              onDecrement={onDecrement}
            ></Counter>
            <br></br>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Counters;
