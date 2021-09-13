import React, { useState, useEffect } from 'react'
import ProductCarousel from './ProductCarousel.jsx'
import ProductDetails from './ProductDetails.jsx'
import ProductDescription from './ProductDescription.jsx'
import * as ProductsProvider from '../../contexts/ProductsContext/jsx'


// Main Product Page



function ProductMainView(props) {
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    ProductsProvider.fetchProductStyles(props.id, (response) => {
      setStyles(response.data)
    })
    ProductsProvider.fetchProductInfo(props.id, (response) => {
      setInfo(response.data)
    })
  }, [])



  const updateStyleHandler = (selectedStyle) => {
    setStyle(selectedStyle);
  }


  return (
    <div>
      <div>
        <ProductCarousel styleData={style} />
        <ProductDetails stylesData={styles} infoData={info} setStyle={updateStyleHandler}/>
      </div>
      <ProductDescription productInfo={info} />
    </div>
  )
}

//make requests to api

//get styles data -> pass down into carousel - one component
//import carousel - pass down props (images) to carousel
//get the state of styles

//import details (title, price, styles, form for size/bags/qty) (folder)
//styles is a component of details
//form is inside
//change state of styles using hooks,

//import bottom product description/slogan - one component

export default ProductMainView;
