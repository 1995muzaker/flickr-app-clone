import React from "react";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import { FaUserFriends, FaImages, FaComments } from "react-icons/fa";
import { GroupDiv, GroupCard, InnerDetails, ImgDiv } from "../../styles/Groups";
import LazyLoader from "../../utilities/LazyLoader";

class ViewGroup extends React.Component {
  render() {
    const { photos } = this.props;
    return (
      <GroupDiv>
        {this.props.error && (
          <div class="row">
            <div class="col-xs-12">
              <div class="alert alert-danger" role="alert">
                <p>{this.props.errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {photos.map((grpData) => {
          return (
            <GroupCard key={grpData.nsid}>
              <ImgDiv>
                <ReactImageFallback
                  src={
                    "https:farm" +
                    grpData.iconfarm +
                    ".staticflickr.com/" +
                    grpData.iconserver +
                    "/buddyicons/" +
                    grpData.nsid +
                    ".jpg"
                  }
                  fallbackImage="https://combo.staticflickr.com/pw/images/buddyicon02_r.png#1104286@N23"
                  alt={grpData.name}
                />
              </ImgDiv>
              <InnerDetails>
                <Link to={"/" + grpData.nsid}>
                  <h4>{grpData.name}</h4>
                </Link>
                <div>
                  <p>
                    <FaUserFriends />
                    {grpData.members}
                  </p>
                  <p>
                    <FaImages />
                    {grpData.pool_count}
                  </p>
                  <p>
                    <FaComments />
                    {grpData.topic_count}
                  </p>
                </div>
              </InnerDetails>
            </GroupCard>
          );
        })}

        {this.props.isLoading && (
          <div class="row" id="loading">
            <div class="col-xs-12">
              <div className="hollow-dots-spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <LazyLoader />
            </div>
          </div>
        )}
        {!this.props.hasMore && (
          <div class="row" id="loading">
            <div class="col-xs-12">
              <div class="alert alert-warning" role="alert">
                <p>NO MORE RESULTS</p>
              </div>
            </div>
          </div>
        )}
      </GroupDiv>
    );
  }
}

export default ViewGroup;
