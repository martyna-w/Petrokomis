import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';

export default function Navbar() {

  const history = useHistory();

      var loggedIn = sessionStorage.getItem("loggedIn")
      var userRole = sessionStorage.getItem("ROLE")
    

    if (userRole === "ADMIN")
    {
      return(
        <nav className ="navbar navbar-expand-lg py-3 navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Petrokomis</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item px-2">
                  <Link to='/' class="nav-link">Strona Główna</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/profile' className="nav-link"><i class="fas fa-user"/> Profil</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/accounts' className="nav-link">Użytkownicy</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/orders' className="nav-link">Zamówienia</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/panel' className="nav-link">Dodaj produkt</Link>
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Szukaj produktu" id="keyword" type="text" onKeyUp={(e) => {handleKeyUp(e, history)}}/>
                <div className="btn btn-outline-success my-2 my-sm-0" onClick={() => {handleSearchButtonPressed(history)}}>Szukaj</div>
              </form>
            </div>
        </div>
      </nav>
    )
    } else if(userRole === "BASIC_USER")
    {
      return(
        <nav class ="navbar navbar-expand-lg navbar-dark bg-dark py-3">
          <div class="container">
          <Link class="navbar-brand" to="/">Petrokomis</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item px-2">
                  <Link to='/' class="nav-link">Strona Główna</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/contact' class="nav-link">Informacje</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/profile' class="nav-link"><i class="fas fa-user"/> Profil</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/order' class="nav-link">Zamówienie</Link>
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Szukaj produktu" id="keyword" type="text" onKeyUp={(e) => {handleKeyUp(e, history)}}/>
                <div className="btn btn-outline-success my-2 my-sm-0" onClick={() => {handleSearchButtonPressed(history)}}>Szukaj</div>
              </form>
            </div>
        </div>
      </nav>
    )
    }   else
    {
      return(
        <nav class ="navbar navbar-expand-lg navbar-dark bg-dark py-3">
          <div class="container">
          <Link class="navbar-brand" to="/">Petrokomis</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item px-2">
                  <Link to='/' class="nav-link">Strona Główna</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/contact' class="nav-link">Informacje</Link>
                </li>
                <li class="nav-item px-2">
                  <Link to='/login' class="nav-link">Zaloguj się</Link>
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Szukaj produktu" id="keyword" type="text" onKeyUp={(e) => {handleKeyUp(e, history)}}/>
                <div className="btn btn-outline-success my-2 my-sm-0" onClick={() => {handleSearchButtonPressed(history)}}>Szukaj</div>
              </form>
            </div>
        </div>
      </nav>
    )
    }   
  }

  function handleKeyUp(event, history) {
    if(event.key === 'Enter'){
      history.push("/search/" + event.target.value)
    }
  }

  function handleSearchButtonPressed(history) {
    let keyword = document.getElementById("keyword")
    history.push("/search/" + keyword.value)
  }
