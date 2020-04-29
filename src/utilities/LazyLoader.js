import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import { SyncLoaderDiv } from "../styles/Gallery";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class LazyLoader extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <SyncLoaderDiv>
        <SyncLoader
          css={override}
          size={15}
          color={"#151517f2"}
          loading={this.state.loading}
        />
      </SyncLoaderDiv>
    );
  }
}

export default LazyLoader;
