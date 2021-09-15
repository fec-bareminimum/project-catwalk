import React from "react"
import ProductCard from "./ProductCard/ProductCard.jsx"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const CardList = ({ products, listTitle, ActionBtn }) => {
  const validProductList = products && products.length > 0

  return (
    <div className="cardList">
      <h3>{listTitle}</h3>

      {validProductList && (
        <Carousel responsive={responsive}>
          {products.map((productObj) => (
            <ProductCard
              {...productObj}
              key={productObj["id"]}
              ActionBtn={ActionBtn}
            />
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default CardList
