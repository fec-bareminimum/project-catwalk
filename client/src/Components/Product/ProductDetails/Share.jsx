import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share"
import { FacebookIcon, TwitterIcon, PinterestIcon } from "react-share"
import Stylesheet from "../styles.css"

function Share() {
  return (
    <>
      <FacebookShareButton
        url={"https://peing.net/ja/"}
        quote={"フェイスブックはタイトルが付けれるようです"}
        hashtag={"#hashtag"}
        description={"aiueo"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
        Facebook
      </FacebookShareButton>
      <TwitterShareButton
        title={"test"}
        url={"https://peing.net/ja/"}
        hashtags={["hashtag1", "hashtag2"]}
      >
        <TwitterIcon size={32} round />
        Twitter
      </TwitterShareButton>
      <PinterestShareButton
        title={"test"}
        url={"https://peing.net/ja/"}
        hashtags={["hashtag1", "hashtag2"]}
      >
        <PinterestIcon size={32} round />
        Pinterest
      </PinterestShareButton>
    </>
  )
}

export default Share
