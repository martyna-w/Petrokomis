import React from "react"
import SignUp from "./SignUp"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Contact from "./Contact"
import Profile from "./Profile"
import AdminPanel from "./Products/AdminPanel"
import UsersAccounts from "./UsersAccountManagement/UserAccounts"
import ProductDetails from "./Products/ProductDeatils"
import ManageUserAccount from "./UsersAccountManagement/ManageUserAccount"
import UserOrdersView from "./Orders/UserOrdersView"
import OrderDetails from "./Orders/OrderDetails"
import OrdersView from "./Orders/OrdersView"
import CartView from "./Cart/CartView"

function App() {

  return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" render = {() => <Dashboard />}  />
              <Route path="/contact" component={Contact} />
              <Route path="/details/:title" component={ProductDetails} />
              <Route path="/search/:keyword" render = {() => <Dashboard />} />
              <Route path="/search/" render = {() => <Dashboard />} />
              <Route path="/profile" render = {() => ((sessionStorage.getItem("ROLE") === "BASIC_USER" || sessionStorage.getItem("ROLE") === "ADMIN") ? (<Profile />) : (<Redirect to="/login" />))} />
              <Route path="/update-profile" render = {() => ((sessionStorage.getItem("ROLE") === "BASIC_USER" || sessionStorage.getItem("ROLE") === "ADMIN") ? (<UpdateProfile />) : (<Redirect to="/login" />))} />
              <Route path="/panel" render = {() => (sessionStorage.getItem("ROLE") === "ADMIN" ? (<AdminPanel />) : (<Redirect to="/login" />))} />
              <Route path="/account/:email" render = {(props) => (sessionStorage.getItem("ROLE") === "ADMIN" ? (<ManageUserAccount {...props} />) : (<Redirect to="/login" />))} />
              <Route path="/accounts" render = {() => (sessionStorage.getItem("ROLE") === "ADMIN" ? (<UsersAccounts />) : (<Redirect to="/login" />))} />
              <Route path="/orders" render = {() => (sessionStorage.getItem("ROLE") === "ADMIN" ? (<OrdersView />) : (<Redirect to="/login" />))} />
              <Route path="/order/:id" render = {(props) => (sessionStorage.getItem("ROLE") === "ADMIN" ? (<OrderDetails {...props} />) : (<Redirect to="/login" />))} />
              <Route path="/myorder/:id" render = {(props) => ((sessionStorage.getItem("ROLE") === "BASIC_USER" || sessionStorage.getItem("ROLE") === "ADMIN") ? (<OrderDetails {...props} />) : (<Redirect to="/login" />))} />
              <Route path="/order" render = {(props) => (sessionStorage.getItem("ROLE") === "BASIC_USER" ? (<CartView {...props}/>) : (<Redirect to="/login" />))} />
              <Route path="/myorders" render = {() => ((sessionStorage.getItem("ROLE") === "BASIC_USER" || sessionStorage.getItem("ROLE") === "ADMIN") ? (<UserOrdersView />) : (<Redirect to="/login" />))} />
              <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
              <div className="w-100" style={{ maxWidth: "400px"}}>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              </div>
              </Container>
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App
