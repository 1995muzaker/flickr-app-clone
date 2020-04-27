import React, { Component } from "react";
import axios from "axios";
import { MansoryDiv } from "../../styles/Gallery";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    };
  }
  componentDidMount() {
    this.loadImg();
  }

  loadImg = () => {
    let id = this.props.match.params.post_id;
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=abb6b76e3ebf3f6f084ac52590164c7c",
        {
          params: {
            group_id: id,
            tagmode: "any",
            format: "json",
            sort: "relevance",
            nojsoncallback: 1,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          pictures: res.data.photos.photo,
        });
      });
  };

  render() {
    return (
      <MansoryDiv>
        {this.state.pictures.map((grpData) => {
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
                    {/* <div className="update">
                      <p>posted at: {grpData.dateadded}</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </MansoryDiv>
    );
  }
}

export default Gallery;
