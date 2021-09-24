export const getAverageRating = (ratingsObj) => {
  let reviewAverage = 0

  const ratings = ratingsObj
  if (ratings) {
    const reviewCount = Object.values(ratings).reduce(
      (sum, num) => (sum += parseInt(num)),
      0
    )

    let ratingsSum = 0
    for (const rating in ratings) {
      ratingsSum += parseInt(rating) * parseInt(ratings[rating])
    }

    reviewAverage = ratingsSum / reviewCount
  }

  return reviewAverage
}

export const extractPriceString = (product) => {
  return product["default_price"]
}

export const extractThumbnailLink = (product, productStyleIndex = 0) => {
  const placeholderImg =
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
  try {
    const imageUrl =
      product["styles"]["results"][productStyleIndex].photos[0].thumbnail_url

    return imageUrl || "" // || placeholderImg
  } catch {
    return "" // placeholderImg
  }
}

export const extractSalesPrice = (product, styleIndex = 0) => {
  try {
    const stylesObj = product["styles"]["results"][styleIndex]
    if (styleObj && styleObj["sale_price"] && styleObj["sale_price"] !== null) {
      return styleObj["sale_price"]
    }
    return
  } catch {
    return
  }
}

export const formatPriceStr = (priceStr) => {
  // 140.00 (integer) => "$140" (string)
  return `$${Number(priceStr).toFixed(0).toLocaleString()}`
}
