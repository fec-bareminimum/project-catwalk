import React from "react"
import ProductCard from "./ProductCard/ProductCard.jsx"
import Carousel from "react-multi-carousel"
import { Card, Container } from "react-bootstrap"
import styled from "styled-components"
import "react-multi-carousel/lib/styles.css"

const Header = styled.h5`
  color: gray;
`
const ListContainer = styled.div``

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
    products.length > 0 ? products : [{ id: 123 }, { id: 123 }, { id: 123 }]

  return (
    <Container className="cardList p-4">
      <Header>{listTitle}</Header>

      <Carousel
        responsive={responsive}
        itemClass="carousel-item-padding-40-px"
        showDots={false}
      >
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
            loading={loading}
          />
        ))}
      </Carousel>
    </Container>
  )
}

export default CardList
