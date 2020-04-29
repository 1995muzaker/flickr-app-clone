import React from "react";
import { IntroDiv } from "../../styles/Groups";

const Intro = () => {
  return (
    <IntroDiv>
      <h1>flickr</h1>
      <h3>
        Search for groups press enter{" "}
        <span role="img" aria-label="enter">
          {" "}
          ↩️{" "}
        </span>{" "}
        <br />
        or <br />
        click search{" "}
        <span role="img" aria-label="search">
          🔍
        </span>{" "}
        button and explore...
      </h3>
    </IntroDiv>
  );
};

export default Intro;
