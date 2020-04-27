import React from "react";
import SearchGroups from "../groups/SearchGroups";
import { HeaderDiv } from "../../styles/Groups";

const Header = ({ handleSubmit, value, handleChange }) => {
  return (
    <HeaderDiv>
      <div>
        <h2>flickr groups</h2>
      </div>
      <SearchGroups
        handleSubmit={handleSubmit}
        value={value}
        handleChange={handleChange}
      />
    </HeaderDiv>
  );
};

export default Header;
