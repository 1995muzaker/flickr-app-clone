import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import axios from "axios";
import Header from "../header";
import BarVisualizations from "./BarVisualizations";
import { MainDiv, ChartDiv } from "../../styles/Groups";
import PieVisualizations from "./PieVisualizations";
import Intro from "./Intro";

class Groups extends Component {
  state = {
    // to check error status
    error: false,
    // if api.length < 1 errorMsg state will render
    errorMsg: "",
    // state to render for infinite scrolling
    hasMore: true,
    // state for network loading
    isLoading: false,
    // state to diplay placeholder message
    emptyData: true,
    // state to store data
    photos: [],
    // state to render number of pages
    currentPage: 0,
    // store the search value
    value: "",
  };

  componentDidMount() {
    // function for infinite scroll
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

  // funtion which stores the search value
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // render group search data onSubmit
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      currentPage: 1,
      photos: [],
      emptyData: false,
    });
    this.loadGroupData();
  };

  // groups.search promise render
  loadGroupData = () => {
    // add the Currentpage on each scroll
    this.setState({ currentPage: this.state.currentPage + 1 });
    // handling data response
    this.setState({ isLoading: true }, () => {
      axios
        .get(
          "https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=90e78b3a04cf9f2321ecbeda297fc2b0",
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
          let hasMore = true;
          let isError = false;
          let errorMsg = "";
          //  no data respnse will fail
          if (res.data.stat === "fail") {
            isError = true;
            errorMsg = res.data.message;
          }
          // check the data response
          const groupData = res.data.groups.group;
          if (groupData.pages === this.state.currentPage) {
            hasMore = false;
          }
          if (groupData.total === "0" || undefined) {
            isError = true;
            errorMsg = "No Photos found";
          }
          // Creates a array of user data
          const nextPhotos = groupData.map((photo) => ({
            nsid: photo.nsid,
            iconfarm: photo.iconfarm,
            iconserver: photo.iconserver,
            name: photo.name,
            members: photo.members,
            pool_count: photo.pool_count,
            topic_count: photo.topic_count,
          }));
          // store the data response
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
    return (
      <div>
        <Header
          handleSubmit={this.handleSubmit}
          value={this.state.searchTerm}
          handleChange={this.handleChange}
        />
        {this.state.emptyData ? (
          <Intro />
        ) : (
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
        )}
      </div>
    );
  }
}

export default Groups;
