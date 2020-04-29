import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { LoaderDiv } from "../styles/Groups";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class NetworkLoader extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <LoaderDiv>
        <BounceLoader
          css={override}
          size={90}
          color={"#151517f2"}
          loading={this.state.loading}
        />
      </LoaderDiv>
    );
  }
}

export default NetworkLoader;
