import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share"
import { FacebookIcon, TwitterIcon, PinterestIcon } from "react-share"
import Stylesheet from "../styles.css"

function ShareSocial() {
  return (
    <>
      <FacebookShareButton
        url={"https://peing.net/ja/"}
        quote={"フェイスブックはタイトルが付けれるようです"}
        hashtag={"#hashtag"}
        description={"aiueo"}
        className="socialImages"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        title={"test"}
        url={"https://peing.net/ja/"}
        hashtags={["hashtag1", "hashtag2"]}
        className="socialImages"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <PinterestShareButton
        title={"test"}
        url={"https://peing.net/ja/"}
        hashtags={["hashtag1", "hashtag2"]}
        className="socialImages"
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
    </>
  )
}

export default ShareSocial
