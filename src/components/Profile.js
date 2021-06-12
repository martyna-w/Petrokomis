import React, { useState } from "react"
import { Alert, Form, Card, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from "./NavBar"
import "../styles/profile.css";
import {Grid} from "@material-ui/core";

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      sessionStorage.removeItem("loggedIn")
      sessionStorage.removeItem("EMAIL")
      sessionStorage.removeItem("ROLE")
    } catch {
      setError("Nie udało się wylogować")
    }
  }

  if(sessionStorage.getItem("ROLE") == "ADMIN"){
    return (
      <>
      <Navbar />
      <div class="container">
        <br/>
      <div class="row">
        <div class="col">
        </div>
        <div class="col">
        <i class="fas fa-user fa-9x fa-profil"/>
        {error && <Alert variant="danger">{error}</Alert>}
        <div class="email">{sessionStorage.getItem("EMAIL").toUpperCase()} </div>
        <Link to="/update-profile" className="btn btn-secondary w-100 mt-4" style={{position: "relative", marginLeft: "-3px"}}>
         ZAKTUALIZUJ PROFIL
        </Link>
        <a className="btn btn-success w-100 mt-4 mb-3" onClick={() => {handleLogout()}} href="/">
         WYLOGUJ
        </a>
        </div>
        <div class="col">
        </div>
        </div>
       </div> 
      </>
    )
  } else if(sessionStorage.getItem("ROLE") == "BASIC_USER"){
    return (
      <>
  <Navbar />
      <div class="container">
        <br/>
      <div class="row">
        <div class="col">
        </div>
        <div class="col">
        <i class="fas fa-user fa-9x fa-profil"/>
        {error && <Alert variant="danger">{error}</Alert>}
        <div class="email">{sessionStorage.getItem("EMAIL").toUpperCase()} </div>
        <Link to="/update-profile" className="btn btn-secondary w-100 mt-4" style={{position: "relative", marginLeft: "-3px"}}>
         ZAKTUALIZUJ PROFIL
        </Link>
        <Link to="/myorders" className="btn btn-secondary w-100 mt-4">
          MOJE ZAMÓWIENIA
        </Link>
        <a className="btn btn-success w-100 mt-4 mb-3" onClick={() => {handleLogout()}} href="/">
         WYLOGUJ
        </a>
        </div>
        <div class="col">
        </div>
        </div>
       </div> 
      </>
    )
  }
}

