import React from "react";
import { Link } from 'react-router-dom'
import { FaUserFriends, FaImages, FaComments } from "react-icons/fa";
import { GroupDiv, GroupCard, InnerDetails, ImgDiv } from "../../styles/Groups";

class ViewGroup extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <GroupDiv>
        {url.map((grpData) => {
          return (
            <GroupCard key={grpData.nsid}>
              <ImgDiv>
                <img
                  src={
                    "https:farm" +
                    grpData.iconfarm +
                    ".staticflickr.com/" +
                    grpData.iconserver +
                    "/buddyicons/" +
                    grpData.nsid +
                    ".jpg"
                  }
                  alt="img"
                />
              </ImgDiv>
              <InnerDetails>
              <Link to={'/' + grpData.nsid}>
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
      </GroupDiv>
    );
  }
}

export default ViewGroup;
