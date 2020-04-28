import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import axios from "axios";
import Header from "../header";
import BarVisualizations from "./BarVisualizations";
import { MainDiv, ChartDiv } from "../../styles/Groups";
import PieVisualizations from "./PieVisualizations";

class Groups extends Component {
  state = {
    error: false,
    errorMsg: "",
    hasMore: true,
    isLoading: false,
    photos: [],
    currentPage: 0,
    value: "",
  };

  componentDidMount() {
    window.onscroll = () => {
      const {
        loadGroupData,
        state: { error, isLoading, hasMore },
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadGroupData();
      }
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    console.log("Form value: " + this.state.value);
    event.preventDefault();
    this.setState({
      currentPage: 1,
      photos: [],
    });
    this.loadGroupData();
  };

  loadGroupData = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.setState({ isLoading: true }, () => {
      axios
        .get(
          "https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=90e78b3a04cf9f2321ecbeda297fc2b0",
          {
            params: {
              text: this.state.value,
              per_page: 20,
              page: this.state.currentPage,
              tagmode: "any",
              format: "json",
              sort: "relevance",
              nojsoncallback: 1,
            },
          }
        )
        .then((res) => {
          console.log(res);
          let hasMore = true;
          let isError = false;
          let errorMsg = "";
          if (res.data.stat === "fail") {
            isError = true;
            errorMsg = res.data.message;
            console.log("Should be FAIL");
          }
          const groupData = res.data.groups.group;
          console.log(groupData);
          if (groupData.pages === this.state.currentPage) {
            hasMore = false;
          }
          console.log("photos Found: ", groupData.total);
          if (groupData.total === "0" || undefined) {
            isError = true;
            errorMsg = "No Photos found";
          }
          // Creates a massaged array of user data
          const nextPhotos = groupData.map((photo) => ({
            nsid: photo.nsid,
            iconfarm: photo.iconfarm,
            iconserver: photo.iconserver,
            name: photo.name,
            members: photo.members,
            pool_count: photo.pool_count,
            topic_count: photo.topic_count,
          }));

          this.setState({
            hasMore: hasMore,
            error: isError,
            errorMsg: errorMsg,
            isLoading: false,
            photos: [...this.state.photos, ...nextPhotos],
          });
        })
        .catch((err) => {
          this.setState({
            error: true,
            errorMsg: err.message,
            isLoading: false,
          });
        });
    });
  };

  render() {
    console.log(this.state.photos);
    return (
      <div>
        <Header
          handleSubmit={this.handleSubmit}
          value={this.state.searchTerm}
          handleChange={this.handleChange}
        />
        <MainDiv>
          <ViewGroup
            error={this.state.error}
            isLoading={this.state.isLoading}
            hasMore={this.state.hasMore}
            photos={this.state.photos}
            errorMsg={this.state.errorMsg}
          />
          <ChartDiv>
            <BarVisualizations photos={this.state.photos} />
            <PieVisualizations photos={this.state.photos} />
          </ChartDiv>
        </MainDiv>
      </div>
    );
  }
}

export default Groups;
