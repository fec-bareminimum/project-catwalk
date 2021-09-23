import React, { useState, useEffect } from "react"
import ProductMainView from "./ProductMainView.jsx"
import { Button, Carousel } from "react-bootstrap"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import ProductModal from "./ProductModal.jsx"
import Stylesheet from "./styles.css"
import Img from "react-cool-img"

function ProductCarouselList(props) {
  const [showExpanded, setShowExpanded] = useState(false)
  const [showZoomed, setShowZoomed] = useState(false)
  const [zoomedItem, setZoomedItem] = useState("")
  const [selectedImage, setSelectedImage] = useState("")

  const toggleExpandedHandler = () => {
    setShowExpanded((prev) => {
      if (prev) {
        setShowZoomed(false)
      }
      return !prev
    })
  }

  const toggleZoomHandler = (e) => {
    setSelectedImage(e.target.currentSrc)
    setShowZoomed(true)
  }

  const removeZoomHandler = () => {
    setShowZoomed(false)
  }

  return (
    <div
      className={`carousel-holder ${showExpanded ? "styleThumb" : "carouselImage"}`}
    >
      <Button
        variant="outline-dark"
        className="fullscreenButton mt-2 mx-4"
        onClick={toggleExpandedHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
        </svg>
      </Button>
      {props.photos && showExpanded ? (
        <>
          <ProductModal onHideZoom={toggleExpandedHandler}>
            <Carousel
              className="px-2"
              interval={null}
              activeIndex={props.indexState}
              onSelect={props.handleSelect}
            >
              {props.photos.map((item, index) => (
                <Carousel.Item key={index}>
                  <Img
                    onClick={toggleZoomHandler}
                    className="carouselExpandedImage"
                    width="auto"
                    height="auto"
                    value={item.url}
                    src={item.url}
                    alt="First Slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </ProductModal>
          {showZoomed && (
            <div className="productZoom" onClick={removeZoomHandler}>
              <Img
                className="carouselExpandedImage"
                width="auto"
                height="auto"
                src={selectedImage}
                alt="First Slide"
              />
            </div>
          )}
        </>
      ) : (
        <Carousel
          className="px-2"
          interval={null}
          activeIndex={props.indexState}
          onSelect={props.handleSelect}
        >
          {props.photos.map((item, index) => (
            <Carousel.Item onClick={toggleExpandedHandler} key={index}>
              <Img
                className="carouselImage"
                width="auto"
                height="auto"
                src={item.url}
                alt="First Slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default ProductCarouselList
