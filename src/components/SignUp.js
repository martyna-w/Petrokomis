import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import app from "./firebase"

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [accept, setAccept] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Hasła się nie zgadzają")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            await createUserInDB(emailRef.current.value, "BASIC_USER", 0, "inactive").then(() => {
                setAccept("Konto zostało utworzone jednak nie jest jeszcze aktywne, poczekaj na kontakt od administratora!")
                emailRef.current.value = ""
                passwordRef.current.value = ""
                passwordConfirmRef.current.value = ""
            })
            
        } catch {
            setError("Nie udało się utworzyć konta. Hasło musi mieć co najmniej 6 znaków.")
        }

        setLoading(false)
    }
    async function createUserInDB(email, role, discount, status){
        const userRef = app.database().ref("UsersAccounts")
        const userInfo = {
            email,
            role,
            discount,
            status
        }

        userRef.push(userInfo);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Utwórz konto </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {accept && <Alert variant="success">{accept}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} 
                            required />
                        </Form.Group>
                        <Form.Group id="password">
                            <br/>
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" ref={passwordRef} 
                            required />
                        </Form.Group>
                        <br/>
                        <Form.Group id="password-confirm">
                            <Form.Label>Potwierdź hasło</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} 
                            required />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className="w-100" type="submit" variant="success">
                            Utwórz
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            Masz już konto? <Link to="/login" style={{ color: '#198754' }}>Zaloguj się.</Link> 
            </div>
            <div className="w-100 text-center mt-2">
            <Link to="/" style={{ color: '#198754' }}>Przejdź do strony głównej</Link> 
            </div>
        </>
    )
}