import React from "react"
import ThemeToggler from "./ThemeToggler/ThemeToggler.jsx"
import styled from "styled-components"

const NavStyle = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`

const Navbar = ({ toggleTheme, isLightMode }) => {
  return (
    <nav className="navbarContainer">
      {/* <img src="./project_logo" alt="Project Logo"></img> */}

      <p>Search Bar</p>

      <NavStyle>
        <ThemeToggler toggleTheme={toggleTheme} isLightMode={isLightMode} />
      </NavStyle>
    </nav>
  )
}

export default Navbar
