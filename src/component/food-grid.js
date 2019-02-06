import React, { Component } from "react";
import axios from "axios";
import DataGrid, {
  Column,
  Grouping,
  Editing,
  Paging
} from "devextreme-react/data-grid";
import { Card, CardText } from "material-ui/Card";
import $ from "jquery";
import { RaisedButton } from "material-ui";
import background from "./assets/grid-background.jpg";
const apiKey = "49edad12be6386085bf6e30bcc25f715";
const app_id = "5e084bfe";
let userDetail = null;

const cellRender = image => <img src={image.value} />;

const cellTemplate = (container, options) => {
  $("<a>" + options.value + "</a>")
    .attr("href", `/food-detail/${userDetail}/` + options.value)
    .attr("target", "_Self")
    .appendTo(container);
};
class FoodGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userDetail: null
    };
    this.onRowInserted = this.onRowInserted.bind(this, "RowInserting");
  }

  onRowInserted(e) {
    localStorage.setItem("data", JSON.stringify(this.state.data));
  }
  onRowRemoved(e) {
    localStorage.setItem("data", JSON.stringify(this.state.data));
  }
  onRowUpdated(e) {
    localStorage.setItem("data", JSON.stringify(this.state.data));
  }

  onToolbarPreparing(e) {
    if (
      this &&
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.userDetail == "admin"
    ) {
      let dataGrid = e.component;
      e.toolbarOptions.items.unshift({
        location: "after",
        widget: "dxButton",
        options: {
          width: "136",
          text: "Add Recipe",
          onClick: function() {
            dataGrid.addRow();
          }
        }
      });
    }
  }

  handleClick(e) {
    this.props.history.push("/login");
  }

  componentDidMount() {
    const cachedHits = localStorage.getItem("data");
    let finalArr = [];
    userDetail =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.userDetail
        ? this.props.location.state.userDetail
        : null;
    let url = `https://api.edamam.com/search?q=spinach&app_id=${app_id}&app_key=${apiKey}&from=0&to=2&calories=591-722&health=alcohol-free`;
    axios
      .get(url)
      .then(resp => {
        for (let i = 0; i < resp.data.hits.length; i++) {
          let foodObj = {};
          let food = resp.data.hits[i];
          foodObj["Reciepe"] = food.recipe.label;
          foodObj["Image"] = food.recipe.image;
          finalArr.push(foodObj);
        }
        this.setState({
          data: cachedHits ? JSON.parse(cachedHits) : finalArr
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
          className="foodGrid"
          style={{
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.87)",
            fontFamily: "cursive",
            paddingBottom: "6.6%",
            background: "linear-gradient(145deg ,#e31837 15%,white 100%)"
          }}
        >
          <CardText>Food Store</CardText>
          <RaisedButton
            label="LOGOUT"
            style={{
              marginLeft: "89%",
              marginTop: "-17px",
              marginBottom: "17px",
              marginRight: "30px"
            }}
            primary={true}
            onClick={this.handleClick.bind(this)}
          />
          {this.state.data && this.state.data.length === 0 ? null : (
            <DataGrid
              id={"gridContainer"}
              dataSource={this.state.data}
              allowColumnReordering={true}
              showBorders={true}
              onRowInserted={this.onRowInserted}
              onRowUpdated={this.onRowUpdated.bind(this)}
              onRowRemoved={this.onRowRemoved.bind(this)}
              onToolbarPreparing={this.onToolbarPreparing.bind(this)}
            >
              <Editing
                mode={"row"}
                allowUpdating={
                  this &&
                  this.props &&
                  this.props.location &&
                  this.props.location.state &&
                  this.props.location.state.userDetail == "admin"
                    ? true
                    : false
                }
                allowDeleting={
                  this &&
                  this.props &&
                  this.props.location &&
                  this.props.location.state &&
                  this.props.location.state.userDetail == "admin"
                    ? true
                    : false
                }
              />
              <Grouping autoExpandAll={false} />
              <Column dataField="Reciepe" cellTemplate={cellTemplate} />
              <Column dataField="Image" cellRender={cellRender} />
              <Paging defaultPageSize={10} />
            </DataGrid>
          )}
        </Card>
      </div>
    );
  }
}

export default FoodGrid;
