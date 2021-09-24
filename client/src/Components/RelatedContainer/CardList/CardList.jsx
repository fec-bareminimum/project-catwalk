import React from "react"
import ProductCard from "./ProductCard/ProductCard.jsx"
import Carousel from "react-multi-carousel"
import { Card, Container } from "react-bootstrap"
import styled from "styled-components"
import "react-multi-carousel/lib/styles.css"

const Header = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 20px 0;
`

const ScrollButton = styled.button`
  padding: 0.2em 0.6em;
  position: absolute;
  z-index: 99;
  top: 50%;
  color: #dfdfdf;
  font-size: 2em;
  background: dimgrey;
`

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={() => onClick()} />;
};
{/* <Carousel  />; */ }

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1150 },
    items: 4,
  },
  medium: {
    breakpoint: { max: 1150, min: 980 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 980, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const CardList = ({ FirstCard, products, listTitle, ActionBtn, loading }) => {
  const validProductList = products && products.length > 0

  const productsToRender =
    products.length > 0 || loading === false
      ? products
      : [{ id: 123 }, { id: 123 }, { id: 123 }]

  return (
    <Container className="cardList p-4" style={{ position: "relative" }}>
      <Header>{listTitle}</Header>

      <ScrollButton>{"<"}</ScrollButton>
      <Carousel responsive={responsive} draggable={true} showDots={false}>
        {FirstCard && (
          <Card
            style={{
              height: "20rem",
              width: "15rem",
              margin: "0.5em",
              background: "transparent",
              border: "none",
            }}
          >
            <Card.Body>{FirstCard}</Card.Body>
          </Card>
        )}

        {productsToRender.map((productObj) => (
          <ProductCard
            {...productObj}
            key={productObj["id"]}
            ActionBtn={ActionBtn}
          />
        ))}
      </Carousel>
      <ScrollButton style={{ right: "5%" }}>{">"}</ScrollButton>
    </Container>
  )
}

export default CardList
