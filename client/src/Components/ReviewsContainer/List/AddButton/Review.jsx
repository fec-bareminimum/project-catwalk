import React, { useState } from "react"
import Form from "react-bootstrap/Form"

const Review = () => {
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  return (
    <Form.Group>
      <Form.Label>Review summary</Form.Label>
      <Form.Control
        type="text"
        placeholder="Example: Best purchase ever!"
        maxLength="60"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <Form.Label>Review body*</Form.Label>
      <Form.Control
        required
        as="textarea"
        placeholder="Why did you like the product or not?"
        maxLength="1000"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Form.Text>
        {body.length < 50
          ? `Minimum required characters left: ${50 - body.length}`
          : "Minimum reached"}
      </Form.Text>
    </Form.Group>
  )
}

export default Review
