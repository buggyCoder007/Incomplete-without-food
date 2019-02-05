import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleClick(e) {
    if (this.state && this.state.username && this.state.password) {
      if (e.target.innerText === "LOGIN AS ADMIN") {
        if (this.state.username === "admin") {
          if (this.state.password === "admin") {
            this.props.history.push({
              pathname: "/food-grid",
              state: { userDetail: "admin" }
            });
          } else {
            alert("Password does not match");
          }
        } else {
          alert("Username does not match");
        }
      } else if (e.target.innerText === "LOGIN AS GUEST") {
        if (this.state.username === "guest") {
          if (this.state.password === "guest") {
            this.props.history.push({
              pathname: "/food-grid",
              state: { userDetail: "guest" }
            });
          } else {
            alert("Password does not match");
          }
        } else {
          alert("Username does not match");
        }
      } else {
        alert("Username  and password does not match");
      }
    }
  }
  render() {
    return (
      <div
        style={{
          marginTop: "9%",
          marginLeft: "28%",
          marginRight: "30%",
          padding: "5%",
          background: "whitesmoke"
        }}
      >
        <AppBar title="Build a Food Recipe " />
        <TextField
          hintText="Enter your username"
          floatingLabelText="Username"
          onChange={(event, newvalue) => {
            this.setState({ username: newvalue });
          }}
        />
        <br />
        <TextField
          floatingLabelText="Password"
          hintText="Please enter your Password"
          type="password"
          onChange={(event, newvalue) => {
            this.setState({
              password: newvalue
            });
          }}
        />
        <br />
        <RaisedButton
          label="Login as Admin"
          value="admin"
          onClick={this.handleClick.bind(this)}
          primary
          style={style}
        />
        <RaisedButton
          label="Login as Guest"
          value="guest"
          onClick={this.handleClick.bind(this)}
          primary
          style={style}
        />
      </div>
    );
  }
}

const style = {
  margin: 15
};
