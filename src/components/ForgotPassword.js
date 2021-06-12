import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Sprawdź skrzynkę pocztową w celu zmiany hasła")
    } catch {
      setError("Nie udało się zmienić hasła")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Zmiana hasła</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="w-100" type="submit" variant="success">
              Zmień hasło
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" style={{ color: '#198754' }}>Zaloguj się</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Nie masz jeszcze konta? <Link to="/signup" style={{ color: '#198754' }}>Utwórz konto</Link>
      </div>
    </>
  )
}