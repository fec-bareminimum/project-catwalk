import React from "react"
import SunIcon from "./SunIcon.jsx"
import MoonIcon from "./MoonIcon.jsx"
import styled from "styled-components"

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 8rem;
  height: 4rem;

  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;
  }
`

const ThemeToggler = ({ toggleTheme, isLightMode }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {isLightMode ? <SunIcon /> : <MoonIcon style={{ marginLeft: "auto" }} />}
    </ToggleContainer>
  )
}

export default ThemeToggler
