import React from "react"
import ThemeToggler from "./ThemeToggler/ThemeToggler.jsx"

const Navbar = ({ toggleTheme, isLightMode }) => {
  return (
    <nav className="navbarContainer">
      {/* <img src="./project_logo" alt="Project Logo"></img> */}

      <p>Search Bar</p>

      <ThemeToggler toggleTheme={toggleTheme} isLightMode={isLightMode} />
    </nav>
  )
}

export default Navbar
