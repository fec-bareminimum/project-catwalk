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
  width: 100%;
  height: 90%;
  color: black;
  font-size: 1.5em;
  margin: auto;
  background: #d7d7d7;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
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
  const { displayedProduct } = useProducts()
  const { outfitList, removeProductFromOutfit, addProductToOutfit, loading } =
    useOutfit()

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
        loading={loading}
      />
    </Section>
  )
}

export default OutfitProducts
