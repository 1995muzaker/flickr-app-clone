import React, { Component } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LayoutDiv, SyncLoaderDiv, NavigateButton } from "../../styles/Gallery";
import NetworkLoader from "../../utilities/Loader";
import LazyLoader from "../../utilities/LazyLoader";

class Gallery extends Component {
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
  };

  componentDidMount() {
    // function for infinite scroll
    window.onscroll = () => {
      const {
        loadImg,
        state: { error, isLoading, hasMore },
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadImg();
      }
    };
    this.handleData();
  }

  // funtion which stores the search value
  handleData() {
    this.setState({
      currentPage: 1,
      photos: [],
    });
    this.loadImg();
  }

  // render group getphoto data on DOM render
  loadImg = () => {
    // add the Currentpage on each scroll
    this.setState({ currentPage: this.state.currentPage + 1 });

    // defines the route id to navigate
    let id = this.props.match.params.post_id;

    // handling data response
    this.setState({ isLoading: true }, () => {
      axios
        .get(
          "https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=90e78b3a04cf9f2321ecbeda297fc2b0",
          {
            params: {
              group_id: id,
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
          if (res.data.stat === "fail") {
            isError = true;
            errorMsg = res.data.message;
          }
          const photoBatch = res.data.photos.photo;

          // render data onScroll for infinte scrolling
          if (photoBatch.pages === this.state.currentPage) {
            hasMore = false;
          }

          if (photoBatch.total === "0") {
            isError = true;
            errorMsg = "No Photos found";
          }
          // Creates a massaged array of user data
          const nextPhotos = photoBatch.map((photo) => ({
            id: photo.id,
            ownername: photo.ownername,
            title: photo.title,
            farm: photo.farm,
            server: photo.server,
            secret: photo.secret,
          }));
          
          // store the data response
          this.setState({
            hasMore: hasMore,
            error: isError,
            errorMsg: errorMsg,
            isLoading: false,
            photos: [...this.state.photos, ...nextPhotos],
          });
        });
    });
  };

  render() {
    if (this.state.photos && this.state.photos.length >= 1) {
      return (
        <div>
          <NavigateButton>
            <button>
              <Link to={"/"}>
                <FaArrowLeft />
                Back to Groups
              </Link>
            </button>
          </NavigateButton>
          {this.state.error && (
            <SyncLoaderDiv>
              <div>
                <p>{this.state.errorMsg}</p>
              </div>
            </SyncLoaderDiv>
          )}
          <LayoutDiv>
            {this.state.photos.map((grpData) => {
              return (
                <div className="grid" key={grpData.id}>
                  <img
                    src={
                      "https://farm" +
                      grpData.farm +
                      ".staticflickr.com/" +
                      grpData.server +
                      "/" +
                      grpData.id +
                      "_" +
                      grpData.secret +
                      ".jpg"
                    }
                    alt="img"
                  />
                  <div className="grid__body">
                    <div className="parent-inner">
                      <div className="inner-div">
                        <div className="relative">
                          <p className="grid__title">{grpData.title}</p>
                          <div className="author-div">
                            <span>Author:</span>&nbsp;
                            <p className="grid__author">{grpData.ownername}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </LayoutDiv>
          {this.state.isLoading && (
            <SyncLoaderDiv>
              <LazyLoader />
            </SyncLoaderDiv>
          )}
          {!this.state.hasMore && (
            <SyncLoaderDiv>
              <div>
                <p>NO MORE RESULTS</p>
              </div>
            </SyncLoaderDiv>
          )}
        </div>
      );
    } else {
      return <NetworkLoader />;
    }
  }
}

export default Gallery;
