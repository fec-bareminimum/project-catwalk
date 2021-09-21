import React, { useState } from "react"
import Form from "react-bootstrap/Form"

const UserInfo = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  return (
    <div>
      <Form.Group>
        <Form.Label>What is your nickname?*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Example: jackson11!"
          maxLength="60"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Text>
          For privacy reasons, do not use your full name or email address
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Your email*</Form.Label>
        <Form.Control
          type="email"
          placeholder="Example: jackson11@email.com"
          maxLength="60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text>For authentication reasons, you will not be emailed</Form.Text>
      </Form.Group>
    </div>
  )
}

export default UserInfo
