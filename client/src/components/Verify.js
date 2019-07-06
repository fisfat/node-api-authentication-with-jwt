import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyCode } from "../actions/authActions";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code_input: "",
      errors: {},
      loading: false
    };
  }
  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.verifyCode({ code_input: this.state.code_input });
  }
  render() {
    return (
      <div>
        <h1>A code has been sent to your phone. Input the code below</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            name="code_input"
            onChange={this.onChange.bind(this)}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyCode }
)(Verify);
