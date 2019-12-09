import React, { Component } from "react";
class Counter extends Component {
  state = {
    counter: this.props.counter
  };

  styles = {
    fontSize: 20,
    fontWright: "bold"
  };

  /*
  Old method
  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    //this.setState({ state: this.state.value + 1 });
    console.log("Button clicked", this.state.value);
  }
  */
  //arrow function don't rebind but inherited
  handleIncrement = id => {
    //this.setState({ value: this.state.counter.value + 1 });

    this.props.onIncrement(id);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatvalue()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter.id)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatvalue() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
