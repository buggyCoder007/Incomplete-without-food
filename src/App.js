import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/login";
import FoodGrid from "./component/food-grid";
import FoodDetail from "./component/food-detail";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/food-grid" component={FoodGrid} />
            <Route path="/food-detail" component={FoodDetail} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
