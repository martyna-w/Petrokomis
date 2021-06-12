import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from "./firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      var loggedIn = new Boolean(true);
      sessionStorage.setItem("loggedIn", loggedIn);
      sessionStorage.setItem("EMAIL", emailRef.current.value);
      getUserRole(emailRef.current.value);

    } catch {
      setError("Nie udało się zalogować")
    }

    setLoading(false)
  }

  function getUserRole(email){
    const userRef = app.database().ref("UsersAccounts").once('value').then(data => {
      if (data.val() != null){
        for(let id in data.val()){
          const currUserRef = app.database().ref("UsersAccounts").child(id).child("email").once('value').then(currData => {
            if (currData.val() != null){
              if (currData.val() == email){
                const activeStatusRef = app.database().ref("UsersAccounts").child(id).child("status").once('value').then(currStatusData => {
                  if(currStatusData.val() != null){
                    if(currStatusData.val() == "active"){
                      const currUserRole = app.database().ref("UsersAccounts").child(id).child("role").once('value').then(currRoleData => {
                        if(currRoleData.val() != null){
                          getEuroRate().then((euroRate) => {
                            sessionStorage.setItem("ROLE", currRoleData.val())
                            sessionStorage.setItem("EURO_RATE", euroRate)
                            history.push("/")
                          })
                        }
                      })
                    } else {
                      setError("Konto nie jest aktywne")
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  async function getEuroRate(){
    const response = await fetch('https://api.nbp.pl/api/exchangerates/rates/c/eur/');
    const json = await response.json();
    const euroRate = JSON.stringify(json["rates"][0]["ask"])

    return  euroRate
    
}

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Zaloguj się</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Form.Group id="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="w-100" type="submit" variant="success">
              Zaloguj się
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" style={{ color: '#198754' }}>Nie pamiętasz hasła?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Nie masz jeszcze konta? <Link to="/signup" style={{ color: '#198754' }}>Utwórz konto</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Wróć do strony głównej <Link to="/" style={{ color: '#198754' }}>Wróć</Link>
      </div>
    </>
  )
}