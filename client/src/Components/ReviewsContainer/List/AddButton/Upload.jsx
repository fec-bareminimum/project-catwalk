import React, { useState, useEffect } from "react"
import { Form, Image } from "react-bootstrap"

const Upload = (props) => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    props.submitData({ photos: photos })
  }, [photos])

  return (
    <Form.Group>
      <Form.Label>Upload your photos</Form.Label>
      {photos.length < 5 ? (
        <Form.Control
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            setPhotos([...photos, e.target.files])
          }}
        />
      ) : null}
      {photos.length > 0
        ? photos.map((photo, i) => (
            <Image key={i} src={URL.createObjectURL(new Blob(photo))} thumbnail />
          ))
        : null}
      {photos.length === 0
        ? photos.map((photo, i) => URL.revokeObjectURL(photo))
        : null}
    </Form.Group>
  )
}

export default Upload
