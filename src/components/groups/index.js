import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import axios from "axios";
import Header from "../header";
import BarVisualizations from "./BarVisualizations";
import { MainDiv, ChartDiv } from "../../styles/Groups";
import PieVisualizations from "./PieVisualizations";
import NetworkLoader from "../../utilities/Loader";

class Groups extends Component {
  state = {
    value: "",
    url: [],
    loading: false,
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true }, () => {
      axios
        .get(
          "https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=90e78b3a04cf9f2321ecbeda297fc2b0",
          {
            params: {
              text: this.state.value,
              tagmode: "any",
              format: "json",
              sort: "relevance",
              nojsoncallback: 1,
            },
          }
        )
        .then((response) => {
          console.log(response.data.groups.group);
          const url = [];
          response.data.groups.group.map((grp) => {
            let temp = url;
            return temp.push(grp);
          });
          this.setState({
            url: url,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    event.preventDefault();
  };

  render() {
    console.log(this.state.url);

    return (
      <div>
        <Header
          handleSubmit={this.handleSubmit}
          value={this.state.value}
          handleChange={this.handleChange}
        />
        {this.state.loading ? (
          <NetworkLoader />
        ) : (
          <MainDiv>
            <ViewGroup url={this.state.url} />
            <ChartDiv>
              <BarVisualizations url={this.state.url} />
              <PieVisualizations url={this.state.url} />
            </ChartDiv>
          </MainDiv>
        )}
      </div>
    );
  }
}
export default Groups;
