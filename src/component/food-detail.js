import React, { Component } from "react";
import axios from "axios";

import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from "material-ui/Card";
import { RaisedButton } from "material-ui";
const apiKey = "49edad12be6386085bf6e30bcc25f715";
const app_id = "5e084bfe";
export default class FoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodObj: {}
    };
  }
  handleClick() {
    let username =
      this.props && this.props.location && this.props.location.pathname
        ? this.props.location.pathname.split("/")
        : null;
    username = username && username.length > 0 ? username[2] : null;
    this.props.history.push({
      pathname: "/food-grid",
      state: { userDetail: username }
    });
  }

  componentDidMount() {
    let foodObj = {};
    let foodName = this.props.location.pathname.split("/");
    foodName = foodName[3];
    let url = `https://api.edamam.com/search?q=spinach&app_id=${app_id}&app_key=${apiKey}&from=0&to=2&calories=591-722&health=alcohol-free`;
    axios
      .get(url)
      .then(resp => {
        for (let i = 0; i < resp.data.hits.length; i++) {
          let food = resp.data.hits[i];
          if (food.recipe.label === foodName) {
            foodObj["Reciepe"] = food.recipe.label;
            foodObj["Image"] = food.recipe.image;
            foodObj["Calories"] = food.recipe.calories;
            foodObj["Ingredients"] = food.recipe.ingredientLines;
          }
        }

        this.setState({
          foodObj
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Card
          style={{
            paddingBottom: "8px",
            marginTop: "56px",
            background: "linear-gradient(145deg ,#e31837 15%,white 100%)"
          }}
        >
          <CardText>Food Description</CardText>
          <CardMedia
            style={style}
            overlay={
              <CardTitle
                title={this.state.foodObj.Reciepe}
                subtitle={this.state.foodObj.Calories}
              />
            }
          >
            <img
              src={this.state.foodObj.Image}
              alt=""
              height="400px"
              width="350px"
            />
          </CardMedia>
          <CardTitle
            style={{
              padding: "16px",
              marginLeft: "520px",
              marginTop: "-217px",
              fontFamily: "cursive",
              background: "palegreen"
            }}
            subtitle="Ingredients"
            title="Believe me it tastes YUM !!!"
          />
          <CardText
            style={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.87)",
              marginLeft: "518px",
              marginTop: "60px",
              fontFamily: "cursive",
              backgroundBlendMode: "soft-light",
              backgroundColor: "antiquewhite"
            }}
          >
            {this.state.foodObj.Ingredients}
          </CardText>
          <CardActions>
            <RaisedButton
              label="Back To List"
              style={{
                marginLeft: "90%",
                marginTop: "2%",
                backgroundColor: "#e40da4"
              }}
              onClick={this.handleClick.bind(this)}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const style = {
  height: "373px",
  width: "486px"
};
