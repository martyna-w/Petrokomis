import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from "./firebase"
import "../styles/update.css";

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [currEmailValue, setCurrEmailValue] = useState(currentUser.email)


  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Hasła się nie zgadzają!")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        const emailToUpdate = {
          email: emailRef.current.value
        }
        const userRef = app.database().ref("UsersAccounts").once('value').then(data => {
          if (data.val() != null){
              for(let id in data.val()){
                  const currUserRef = app.database().ref("UsersAccounts").child(id).child("email").once('value').then(currData => {
                      if (currData.val() != null){
                          if (currData.val() == currEmailValue){
                              const currEmailUpdate = app.database().ref("UsersAccounts").child(id).update(emailToUpdate).then(currEmailsData => {
                                    const orderEmailsRef = app.database().ref("Orders").once('value').then(ordersData => {
                                      if(ordersData.val() != null){
                                        for(let id in ordersData.val()){
                                          const currEmailOrder = app.database().ref("Orders").child(id).child("email").once('value').then(currUserEmailInOrder => {
                                            if(currUserEmailInOrder.val() != null){
                                              if(currUserEmailInOrder.val() == currEmailValue){
                                                const currEmailOrderUpdate = app.database().ref("Orders").child(id).update(emailToUpdate).then(orderEmailUpdated => {
                                                  setCurrEmailValue(emailToUpdate['email'])
                                                  sessionStorage.setItem("EMAIL", emailToUpdate['email'])
                                                  history.push("/profile")
                                                })
                                              }
                                            }
                                          })
                                        }
                                      }
                                    })
                              })
                          }
                      }
                  })
              }
          }
      })
      })
      .catch(() => {
        setError("Nie udało się zaktualizować. Skontaktuj się z administratorem")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    <br/><br/><br/><br/>
      <Card style={{ "width": "40rem", "height": "35rem", "margin-left": "auto", "margin-right": "auto"}}>
        <Card.Body>
          <br/>
          <h3 className="text-center mb-4">Zaktualizuj profil</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Zostaw puste aby nie zmieniać"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Potwierdź hasło </Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Zostaw puste aby nie zmieniać"
              />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="w-100" type="submit" variant="outline-success">
              Aktualizuj
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
        <Link to="/" style={{ color: '#198754' }} >Anuluj</Link>
         </div>
        </Card.Body>
      </Card>
    </>
  )
}