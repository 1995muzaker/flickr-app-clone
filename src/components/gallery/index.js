// import React from "react";

// class Gallery extends React.Component {
//   state = {
//     id: null,
//   };
//   componentDidMount() {
//     let id = this.props.match.params.post_id;
//     this.setState({
//       id,
//     });
//   }
//   render() {
//     return (
//       <div>
//         <p>{this.state.id}</p>
//       </div>
//     );
//   }
// }

// export default Gallery;

import React, { Component } from "react";
import axios from "axios";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.loadImg();
  }
//   Delay = (function () {
//     var timer = 0;
//     return function (callback, ms) {
//       clearTimeout(timer);
//       timer = setTimeout(callback, ms);
//     };
//   })();

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
        this.setState({
          pictures: res.data.photos.photo,
        })
      });

    // let str = (this.state.searchString).length > 0 ? (this.state.searchString): 'birds';
    // console.log(str);

    // fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0cfe5982584801c4b835e6231df36efb&tags='+str+'&per_page='+(this.state.numPhotos)+'&page=1&safe_search=1&format=json&nojsoncallback=1')
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(j){
    //     let picArray = j.photos.photo.map((pic) => {
    //     console.log(pic);
    //     var titlePic = pic.title;
    //     var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
    //     var KeyID = pic.id;
    //     var KeyID2 =srcPath;
    //     return(
    //         <div>
    //             <h3 key={KeyID} >{titlePic}</h3>
    //             <img key={KeyID2} alt="birds" src={srcPath}></img>
    //         </div>

    //     )
    //     })
    //     this.setState({pictures: picArray});
    // }.bind(this))
  };

  // here we are setting up the code for string search that user types in the input field
  //   handleChange(event) {
  //     const { name, value, type } = event.target;
  //     if (type === "select-one") {
  //       let newNumPhotos = value;
  //       this.setState({ numPhotos: newNumPhotos });
  //     }
  //     if (type === "text") {
  //       let newSearchString = value;
  //       this.setState({ searchString: newSearchString });
  //     }
  //     this.loadImg();
  //   }

  render() {
    return (
      <div>
        {this.state.pictures.map((grpData) => {
          return (
            <div key={grpData.id}>
              <div>
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
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
