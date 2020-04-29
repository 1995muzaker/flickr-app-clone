import React from "react";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import { FaUserFriends, FaImages, FaComments } from "react-icons/fa";
import { GroupDiv, GroupCard, InnerDetails, ImgDiv } from "../../styles/Groups";
import LazyLoader from "../../utilities/LazyLoader";

const ViewGroup = ({ photos, error, errorMsg, isLoading, hasMore }) => {
  return (
    <GroupDiv>
      {error && (
        <div>
          <p>{errorMsg}</p>
        </div>
      )}

      {photos.map((grpData) => {
        return (
          <GroupCard key={grpData.nsid}>
            <ImgDiv>
              <ReactImageFallback
                src={
                  "https://farm" +
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

      {isLoading && <LazyLoader />}
      {!hasMore && (
        <div>
          <p>NO MORE RESULTS</p>
        </div>
      )}
    </GroupDiv>
  );
};

export default ViewGroup;
