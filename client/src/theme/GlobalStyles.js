import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
  }

  // .card-themed {
  //   bg: ${({ theme }) => theme};
  // }

  // button {
  //   background: ${({ theme }) => theme.colors.button.background};
  //   color: ${({ theme }) => theme.colors.button.text};
  //   margin-right: ${({ theme }) => theme.colors.button.right};
  //   border-radius: ${({ theme }) => theme.colors.button.radius};
  //   border: ${({ theme }) => theme.colors.button.border};
  //   padding: ${({ theme }) => theme.colors.button.padding};
  // }
`
