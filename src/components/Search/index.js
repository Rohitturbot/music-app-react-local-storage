import React from "react";
import Icon from "../Icon";
import { FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { searchIcon } from "../../constants/icon";

const Search = ({ query, onSearch, searchAction }) => {
  return (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search song"
          value={query}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchAction();
            }
          }}
        />
        <InputGroup.Append>
          <InputGroup.Text onClick={() => searchAction()}>
            <Icon icon={searchIcon} />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </FormGroup>
  );
};

export default Search;
