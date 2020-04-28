import React, { Component } from "react";
import axios from "axios";
import { MansoryDiv, SyncLoaderDiv } from "../../styles/Gallery";
import NetworkLoader from "../../utilities/Loader";
import LazyLoader from "../../utilities/LazyLoader";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      errorMsg: "",
      hasMore: true,
      isLoading: false,
      photos: [],
      currentPage: 0,
    };
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
  }

  componentDidMount() {
    this.handleData();
  }

  handleData() {
    // console.log('Form value: ' + this.state.searchTerm);
    this.setState({
      currentPage: 1,
      photos: [],
    });
    this.loadImg();
  }

  loadImg = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    let id = this.props.match.params.post_id;

    this.setState({ isLoading: true }, () => {
      axios
        .get(
          // "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=abb6b76e3ebf3f6f084ac52590164c7c",
          "https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=bb8bdb0456894e52d09584f7c07d29c7",
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
          console.log(res);
          //   this.setState({
          //     photos: res.data.photos.photo,
          //   });
          let hasMore = true;
          let isError = false;
          let errorMsg = "";
          if (res.data.stat === "fail") {
            isError = true;
            errorMsg = res.data.message;
            console.log("Should be FAIL");
          }
          const photoBatch = res.data.photos.photo;
          console.log(photoBatch);
          if (photoBatch.pages === this.state.currentPage) {
            hasMore = false;
          }
          console.log("photos Found: ", photoBatch.total);
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
          {this.state.error && (
            <SyncLoaderDiv>
              <div>
                <p>{this.state.errorMsg}</p>
              </div>
            </SyncLoaderDiv>
          )}
          <MansoryDiv>
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
          </MansoryDiv>
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
