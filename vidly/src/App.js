import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h1>Hello World</h1>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
          </table>
        </div>
      </main>
    );
  }
}

export default App;
