import React from "react";
import { FaSearch } from "react-icons/fa";
import { FormDiv } from "../../styles/Groups";

const SearchGroups = ({ handleSubmit, value, handleChange }) => {
  return (
    <FormDiv onSubmit={handleSubmit}>
      <button type="submit">
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder="Search group's name"
        value={value}
        onChange={handleChange}
      />
    </FormDiv>
  );
};

export default SearchGroups;
