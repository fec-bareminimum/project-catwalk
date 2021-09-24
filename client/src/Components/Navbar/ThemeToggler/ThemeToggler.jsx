import React from "react"
import MoonIcon from "./MoonIcon.jsx"
import SunIcon from "./SunIcon.jsx"
import { useTheme } from "../../../theme/useTheme"
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
  width: 6rem;
  height: 2.7rem;
  margin-top: 10px;
  svg {
    height: auto;
    width: 1.5rem;
    transition: all 0.3s linear;
  }
`

const ThemeToggler = ({ toggleTheme, isLightMode }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {isLightMode ? <SunIcon style={{ marginLeft: "auto" }} /> : <MoonIcon />}
    </ToggleContainer>
  )
}

export default ThemeToggler
