import React from "react"
import { InputGroup, FormControl } from "react-bootstrap"
import styled from "styled-components"
import { Col } from "react-bootstrap"

const Search = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
`

const SearchBar = (props) => {
  return (
    <Search>
      <Col>
        <InputGroup className="searchBar" size="lg">
          <FormControl
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            onChange={props.handleSearchChange}
            value={props.searchValue}
          />
        </InputGroup>
      </Col>
    </Search>
  )
}

export default SearchBar
