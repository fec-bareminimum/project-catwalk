import React from "react"
import CardList from "../CardList/CardList.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import useOutfit from "../../../contexts/OutfitContext.jsx"
import PlusIcon from "./PlusIcon.jsx"
import RemoveButton from "./RemoveButton/RemoveButton.jsx"
import styled from "styled-components"

const Section = styled.section`
  margin-bottom: 2em;
`

const Button = styled.button`
  width: 10em;
  height: 10em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const AddToOutfitBtn = ({ handleClick }) => {
  return (
    <Button className="addToCard" onClick={handleClick}>
      <PlusIcon />
      Add To Outfit
    </Button>
  )
}

const OutfitProducts = () => {
  const { displayedProduct } = useProduct()
  const { outfitList, removeProductFromOutfit, addProductToOutfit } = useOutift()

  const handleAddClick = () => {
    addProductToOutfit(displayedProduct)
  }

  return (
    <Section className="outfitProductsContainer">
      <CardList
        FirstCard={<AddToOutfitBtn handleClick={handleAddClick} />}
        products={outfitList}
        listTitle={"YOUR OUTFIT"}
        ActionBtn={RemoveButton}
      />
    </Section>
  )
}

export default OutfitProducts
