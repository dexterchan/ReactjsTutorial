import React, { Component } from "react";
class Counter extends Component {
  state = {
    value: this.props.value,
    tags: ["tag1", "tag2", "tag3"]
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
  handleIncrement = () => {
    this.setState({ value: this.state.value + 1 });
    //console.log("Button clicked", this.state.value);
  };

  rendertags() {
    if (this.state.tags.length === 0) {
      return <p>There are no tags!</p>;
    } else {
      return (
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      );
    }
  }
  render() {
    console.log("props:", this.props);
    return (
      <React.Fragment>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatvalue()}</span>
        <button
          onClick={() => this.handleIncrement()}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatvalue() {
    const { value } = this.state;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
