import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
class LoginForm extends Component {
  //username = React.createRef();
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };
  componentDidMount() {
    // this.username.current.focus();
  }
  schema = {
    username: Joi.string()
      .required()
      .label("User Name"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  validate() {
    const { account } = this.state;
    const { error } = Joi.validate(account, this.schema, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }
  validateProperty({ id: name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  }
  handleSubmit = e => {
    e.preventDefault(); // avoid full page reload
    //Call the server
    //Not encouraged to access real DOM like below
    //const username = document.getElementById("username").value;
    //const username = this.username.current.value;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //console.log(`Submitted:'${username}'`);
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.id] = errorMessage;
    } else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account, errors });
  };
  render() {
    const { username, password } = this.state.account;
    const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label={"UserName"}
            name={"username"}
            value={username}
            error={errors.username}
            type={"text"}
            onChange={this.handleChange}
          />
          <Input
            label={"Password"}
            name={"password"}
            value={password}
            error={errors.password}
            type={"password"}
            onChange={this.handleChange}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
