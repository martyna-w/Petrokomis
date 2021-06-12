import React from 'react'
import { totalPrice, totalQuantity, totalPriceDouble, totalQuantityDouble, submitOrder } from './CartService'
import Navbar from '../NavBar'
import ProductsInCart from './ProductsInCart'
import app from "../firebase"
import "./style.css";
import { Alert } from "react-bootstrap"
import { ThreeSixtyTwoTone } from '@material-ui/icons'

export default class CartView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalPriceFromHere: totalPriceDouble * sessionStorage.getItem("EURO_RATE"),
            totalQuantityFromHere: totalQuantityDouble,
            discount: 0,
            shippingInfo: "",
            error: ""

        };

    }

    componentDidMount() {

        this.priceSubscription = totalPrice.subscribe(price => {

            this.setState({ totalPriceFromHere: price * sessionStorage.getItem("EURO_RATE") })
        });

        this.quantitySubscription = totalQuantity.subscribe(quantity => {

            this.setState({ totalQuantityFromHere: quantity });
        });

        const userRef = app.database().ref("UsersAccounts").once('value').then(data => {
            if (data.val() != null){
                for(let id in data.val()){
                    const currUserRef = app.database().ref("UsersAccounts").child(id).child("email").once('value').then(currData => {
                        if (currData.val() != null){
                            if (currData.val() == sessionStorage.getItem("EMAIL")){
                                const currUserDiscount = app.database().ref("UsersAccounts").child(id).child("discount").once('value').then(currDiscountData => {
                                    if(currDiscountData.val() != null){
                                        this.setState({discount: currDiscountData.val()})
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

    }

    componentWillUnmount() {

        this.priceSubscription.unsubscribe();
        this.quantitySubscription.unsubscribe();
    }

    render(){

        return(
            <>
            <Navbar />
            <div className="main-content">
                <div className="section-content section-content-p30">
                    <br/>
                    <div className="container">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th width="28%">Produkt</th>
                                    <th width="50%">Szczegóły</th>
                                    <th width="22%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <ProductsInCart />
                                </tbody>
                                </table>
                                <br/>
                                <table className="table table-bordered">
                                <tbody>
                                <tr class="trstyle">
                                <td width="78%">
                                    <h5>Termin złożenia zamówienia:</h5>
                                    <hr/>
                                    <h5>Wartość netto PLN: </h5>
                                    <hr/>
                                    <h5>Rabat: </h5>
                                    <hr />
                                    <h5>Koszt wysyłki: </h5>
                                    <hr />
                                    <h5>Termin wysyłki: </h5>
                                    <hr />
                                    <h4>Suma: </h4>
                                </td>
                                <td width="22%">
                                <h5> {new Date().toLocaleDateString()} </h5>
                                    <hr/>
                                    <h5>{this.state.totalPriceFromHere.toFixed(2)} PLN </h5>
                                    <hr/>
                                    <h5>{this.state.discount} %</h5>
                                    <hr />
                                    <h5>Ustala sprzedawca</h5>
                                    <hr />
                                    <h5>Ustala sprzedawca</h5>
                                    <hr />
                                    <h4>{(this.state.totalPriceFromHere * ((100-this.state.discount) / 100)).toFixed(2)} PLN</h4>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                        <h4>Dane do wysyłki</h4>
                            <div className="input-group">
                                <textarea className="form-control" id="shippingInfo" name="shippingInfo" rows="4" placeholder="adres wysyłki, telefon"
                                         onChange={(e) => {this.setState({shippingInfo: e.target.value})}}>
                                </textarea>
                            </div>
                        <div size="large" className="btn btn-success w-100 mt-3" onClick={() => {
                                        if (this.state.totalQuantityFromHere > 0){
                                            if (this.state.shippingInfo != ""){
                                                submitOrder(new Date().toLocaleDateString(), this.state.discount, this.state.totalPriceFromHere.toFixed(2), this.state.shippingInfo)
                                                this.props.history.push("/myorders")
                                            }
                                            else 
                                            {
                                                this.setState({
                                                    error: "Wpisz dane do wysyłki!"
                                                })
                                            }
                                        }
                                        else
                                        {
                                            this.setState({
                                                error: "Dodaj produkty do zamówienia!"
                                            })
                                        }
                                    }}>
                                    ZŁÓŻ ZAMÓWIENIE
                                    </div>
                    </div>
                    <br/>
                </div>
            </div>
            
            </>
        )
    }
}
