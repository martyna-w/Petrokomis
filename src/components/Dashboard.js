import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory, useParams } from "react-router-dom"
import Navbar from "./NavBar"
import Products from "./Products/Products"
import "../styles/carousel.css";
import { Carousel } from "react-bootstrap";
import slajd1 from "../images/slajd1.jpg";
import slajd2 from "../images/slajd2.jpg";
import slajd3 from "../images/slajd3.jpg";



export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Nie udało się wylogować")
    }
  }

  return (
    <>
    <Navbar />
    <div class="container-fluid pt-1 shadow justify-center bg-light"></div>    
    <div className="Products">
      <Products />
    </div>  
    </>
  )
}