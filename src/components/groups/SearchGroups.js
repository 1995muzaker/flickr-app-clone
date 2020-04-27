import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import { FormDiv } from "../../styles/Groups";

class SearchGroups extends Component {
  render() {
    const { handleSubmit, value, handleChange } = this.props;
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
  }
}

export default SearchGroups;
