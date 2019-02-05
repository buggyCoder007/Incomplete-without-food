import React, { Component } from "react";
import axios from "axios";
import DataGrid, {
  Column,
  Grouping,
  Editing,
  Paging,
  SearchPanel
} from "devextreme-react/data-grid";
import { Card, CardText } from "material-ui/Card";
import $ from "jquery";
import { RaisedButton } from "material-ui";
const apiKey = "49edad12be6386085bf6e30bcc25f715";
const app_id = "5e084bfe";
const cellRender = image => <img src={image.value} />;
const cellTemplate = (container, options) => {
  $("<a>" + options.value + "</a>")
    .attr("href", "/food-detail/" + options.value)
    .attr("target", "_Self")
    .appendTo(container);
};
class FoodGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      events: []
    };
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, "EditingStart");
    this.onInitNewRow = this.logEvent.bind(this, "InitNewRow");
    this.onRowInserting = this.logEvent.bind(this, "RowInserting");
    this.onRowInserted = this.logEvent.bind(this, "RowInserted");
    this.onRowUpdating = this.logEvent.bind(this, "RowUpdating");
    this.onRowUpdated = this.logEvent.bind(this, "RowUpdated");
    this.onRowRemoving = this.logEvent.bind(this, "RowRemoving");
    this.onRowRemoved = this.logEvent.bind(this, "RowRemoved");
    this.clearEvents = this.clearEvents.bind(this);
  }
  logEvent(eventName) {
    this.setState(state => {
      return { events: [eventName].concat(state.events) };
    });
  }

  clearEvents() {
    this.setState({ events: [] });
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
    let finalArr = [];
    let url = `https://api.edamam.com/search?q=spinach&app_id=${app_id}&app_key=${apiKey}&from=0&to=9&calories=591-722&health=alcohol-free`;
    axios
      .get(url)
      .then(resp => {
        for (let i = 0; i < resp.data.hits.length; i++) {
          let foodObj = {};
          let food = resp.data.hits[i];
          foodObj["Reciepe"] = food.recipe.label;
          foodObj["Image"] = food.recipe.image;
          foodObj["Calories"] = food.recipe.calories;
          finalArr.push(foodObj);
        }
        this.setState({
          data: finalArr
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
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.87)",
            fontFamily: "cursive",
            backgroundBlendMode: "soft-light",
            backgroundColor: "antiquewhite"
          }}
        >
          <CardText>Food Store</CardText>
          <RaisedButton
            label="LOGOUT"
            style={{
              marginLeft: "92%",
              marginTop: "16px"
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
              onEditingStart={this.onEditingStart}
              onInitNewRow={this.onInitNewRow}
              onRowInserting={this.onRowInserting}
              onRowInserted={this.onRowInserted}
              onRowUpdating={this.onRowUpdating}
              onRowUpdated={this.onRowUpdated}
              onRowRemoving={this.onRowRemoving}
              onRowRemoved={this.onRowRemoved}
              onToolbarPreparing={this.onToolbarPreparing.bind(this)}
            >
              <SearchPanel visible={true} />
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
              <Column dataField="Calories" />
              <Paging defaultPageSize={10} />
            </DataGrid>
          )}
        </Card>
      </div>
    );
  }
}

export default FoodGrid;
