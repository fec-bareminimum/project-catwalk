import React from "react"
import ThemeToggler from "./ThemeToggler/ThemeToggler.jsx"
import styled from "styled-components"
import { Navbar, Container } from "react-bootstrap"

const NavStyle = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  overflow: hidden;
`

const MoveLeft = styled.div`
  margin-right: 120px;
  padding: 10px;
`
const Search = styled.div`
  padding-left: 0.5rem;
`

const Logo = styled.div`
  margin-left: 805px;
  text-center: 1.1em;
  text-size: 1.5em;
  font-style: italic;
`

const Nav = ({ toggleTheme, isLightMode }) => {
  return (
    <Navbar
      className="navbar-fixed-top"
      bg="dark"
      variant="light"
      style={{ color: "white" }}
    >
      {/* <img src="./project_logo" alt="Project Logo"></img> */}
      <Logo>
        <Navbar.Brand style={{ color: "white" }} href="#home">
          The Bare Minimum
        </Navbar.Brand>
      </Logo>
      <Navbar.Collapse className="justify-content-end" style={{ color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <Search>
          <Navbar.Text className="search" style={{ color: "white" }}>
            Search
          </Navbar.Text>
        </Search>
      </Navbar.Collapse>
      <MoveLeft>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
          color="white"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      </MoveLeft>
      <NavStyle>
        <ThemeToggler toggleTheme={toggleTheme} isLightMode={isLightMode} />
      </NavStyle>
    </Navbar>
  )
}

export default Nav
