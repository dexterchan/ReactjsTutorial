import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import config from "./config.json";

import httpservices from "./services/httpservices";

class App extends Component {
  state = {
    posts: []
  };

  methodDoesNotExist = () => {
    throw new Error("method not exists!");
  };
  handleAdd = async () => {
    console.log("Add");
    const obj = { title: "a", body: "b" };
    const { data: post } = await httpservices.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    const originalPosts = this.state.posts;
    post.title = "UPDATED";
    const posts = [...this.state.posts];
    const inx = posts.indexOf(post);
    posts[inx] = post;
    this.setState({ posts });

    try {
      await httpservices.put(`${config.apiEndpoint}/999`, post);
      console.log("updated successfully");
    } catch (ex) {
      //expected error
      if (ex.response && ex.response.status === 404) {
        alert("This post has been updated wrongly");
      }
      this.setState({ posts: originalPosts });
    }
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    //Optimistic update... update UI before calling backend
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await httpservices.delete(`${config.apiEndpoint}/${post.id}`);
      //throw new Error("");
      console.log("no problem");
    } catch (ex) {
      //expected error
      if (ex.response && ex.response.status === 404) {
        alert("This post has been deleted");
      } else {
        console.log("Logging the error", ex);
        alert(`An unexpected error occurred : ${post.title}`);
      }

      this.setState({ posts: originalPosts });
    }
  };
  async componentDidMount() {
    const postLink = config.apiEndpoint;
    //Pending -> resolve(success) or reject(failure)
    const { data: posts } = await httpservices.get(postLink);
    this.setState({ posts });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button onClick={this.methodDoesNotExist}>Break the world</button>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
