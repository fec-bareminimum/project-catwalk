import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"

const Upload = () => {
  const [photos, setPhotos] = useState([])
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
