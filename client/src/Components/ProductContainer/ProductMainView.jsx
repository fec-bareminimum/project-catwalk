import React, { useState, useContext, useEffect } from "react"
import ProductDescription from "./ProductDescription.jsx"
import { ProductsContext } from "../../contexts/ProductsContext.jsx"
import { Navbar, Container, Row, Col, Placeholder } from "react-bootstrap"
import ProductCarouselList from "./ProductCarouselList.jsx"
import ProductDetails from "./ProductDetails/ProductDetails.jsx"
import useProducts from "../../contexts/ProductsContext.jsx"
import useCart, { CartProvider } from "../../contexts/CartContext.jsx"
import Img from "react-cool-img"

function ProductMainView(props) {
  const [selectedStyle, setStyle] = useState(null)
  const { displayedProduct } = useProducts()
  const styleList = (displayedProduct.styles || {}).results || []

  useEffect(() => {
    if (displayedProduct.styles !== undefined) {
      setStyle(styleList[0])
    }
  }, [styleList, displayedProduct])

  const info = displayedProduct
  const [index, setIndex] = useState(0)
  const [visibleCarThumb, setVisibleCarThumb] = useState([])
  const [stylePhotos, setStylePhotos] = useState([])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  useEffect(() => {
    if (selectedStyle) {
      setStylePhotos(selectedStyle.photos)
      setVisibleCarThumb(selectedStyle.photos.slice(0, 4))
    }
  }, [selectedStyle])

  const updateStyleHandler = (selectedStyle) => {
    setStyle(selectedStyle)
  }

  const updateStyleFromID = (id) => {
    const style = styleList.filter((item) => item.style_id === id)[0]
    updateStyleHandler(style)
  }

  const updateThumbnailHandlerBackward = () => {
    setIndex(0)
    setVisibleCarThumb((prev) => {
      let endpos = selectedStyle.photos.indexOf(prev[0])
      return selectedStyle.photos.slice(endpos < 0 ? 0 : endpos - 4, endpos)
    })
  }

  const updateThumbnailHandlerForward = () => {
    setIndex(0)
    setVisibleCarThumb((prev) => {
      let startpos = selectedStyle.photos.indexOf(prev[prev.length - 1])
      return selectedStyle.photos.slice(
        startpos + 1,
        startpos > selectedStyle.photos.length - 1
          ? selectedStyle.photos.length - 1
          : startpos + 5
      )
    })
  }

  return (
    <CartProvider>
      <div>
        <Container>
          <Container>
            <p className="siteHeader">
              SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE/DISCOUNT <b>OFFER</b> --{" "}
              <a className="highlight">NEW PRODUCT HIGHLIGHT</a>
            </p>
          </Container>
          <div>
            <Row className="car">
              <Col md={8}>
                {selectedStyle && (
                  <div className="d-flex flex-row align-items-center flex-nowrap">
                    <div className="d-flex flex-column thumb-list">
                      {!visibleCarThumb.includes(selectedStyle.photos[0]) && (
                        <div
                          onClick={updateThumbnailHandlerBackward}
                          className="m-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="35"
                            fill="currentColor"
                            className="center-block ml-2 bi bi-arrow-up-circle-fill align-items-center"
                            viewBox="0 0 16 16"
                            alt="thumb"
                          >
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                          </svg>
                        </div>
                      )}
                      {visibleCarThumb.map((item, i) => (
                        <div key={i} onClick={() => setIndex(i)}>
                          <Img
                            className="lol mb-1 mr-1"
                            style={{ border: index === i ? "5px solid" : "" }}
                            width="77px"
                            height="77px"
                            src={item.thumbnail_url}
                            alt="thumb"
                          />
                        </div>
                      ))}
                      <div onClick={updateThumbnailHandlerForward} className="ms-2">
                        {!visibleCarThumb.includes(
                          selectedStyle.photos[selectedStyle.photos.length - 1]
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            align="center"
                            width="27"
                            height="35"
                            fill="currentColor"
                            className="center-block ml-2 bi bi-arrow-down-circle-fill align-items-center"
                            viewBox="0 0 16 16"
                            alt="thumb"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {selectedStyle && (
                      <ProductCarouselList
                        indexState={index}
                        setIndexState={setIndex}
                        photos={visibleCarThumb}
                        handleSelect={handleSelect}
                      />
                    )}
                  </div>
                )}
              </Col>
              <Col md={4}>
                <ProductDetails
                  updateStyle={updateStyleFromID}
                  selectedStyle={selectedStyle}
                  stylePhotos={stylePhotos}
                  stylesData={styleList}
                  infoData={info}
                  setStyle={updateStyleHandler}
                />
              </Col>
            </Row>
          </div>
          <div className="desc">
            <ProductDescription productInfo={info} />
          </div>
        </Container>
      </div>
    </CartProvider>
  )
}

export default ProductMainView
