import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser, requestCode } from "../actions/authActions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      phone_number: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.requestCode();
      this.props.history.push("/verify");
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      phone_number: this.state.phone_number
    };
    this.props.registerUser(userData, this.props.history);
  }
  render() {
    return (
      <div>
        <h1>SignUp page</h1>
        <form onSubmit={this.onSubmit}>
          name{" "}
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            id=""
          />
          email{" "}
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            id=""
          />
          password{" "}
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            id=""
          />
          confirm_password{" "}
          <input
            type="text"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
            id=""
          />
          phone:{" "}
          <input
            type="text"
            name="phone_number"
            value={this.state.phone_number}
            onChange={this.onChange}
            id=""
          />
          <input type="submit" name="submit" value="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { registerUser, requestCode }
)(withRouter(SignUp));
