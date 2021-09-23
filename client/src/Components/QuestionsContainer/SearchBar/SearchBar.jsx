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
  function handleSearchChange(e) {
    props.setSearchValue(e.target.value)
    if (e.target.value.length > 2) {
      props.setFilterBySearch(e.target.value)
    } else {
      props.setFilterBySearch("")
    }
  }

  return (
    <Search>
      <Col>
        <InputGroup className="searchBar" size="lg">
          <FormControl
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            onChange={handleSearchChange}
            value={props.searchValue}
          />
        </InputGroup>
      </Col>
    </Search>
  )
}

export default SearchBar
