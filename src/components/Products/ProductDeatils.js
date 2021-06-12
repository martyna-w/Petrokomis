import React from 'react';
import { addToCart, computeCartTotals } from '../Cart/CartService';
import app from "../firebase";
import Navbar from '../NavBar';
import "./style.css";

export default class ProductDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            url: "",
            title: props.match.params.title,
            description: "",
            price: 0
        };
    }

    componentDidMount() {
        const prodRef = app.database().ref("Products").once('value').then(data => {
            if (data.val() != null){
                for(let id in data.val()){
                    const currProdRef = app.database().ref("Products").child(id).child("title").once('value').then(currData => {
                        if (currData.val() != null){
                            if (currData.val() == this.state.title){
                                this.setState({id: id})
                                const currProdUrl = app.database().ref("Products").child(id).child("url").once('value').then(currUrlData => {
                                    if(currUrlData.val() != null){
                                        this.setState({ url: currUrlData.val() });
                                    }
                                })

                                const currProdDescription = app.database().ref("Products").child(id).child("description").once('value').then(currDescriptionData => {
                                    if(currDescriptionData.val() != null){
                                        this.setState({ description: currDescriptionData.val() });
                                    }
                                })

                                const currProdPrice = app.database().ref("Products").child(id).child("price").once('value').then(currPriceData => {
                                    if(currPriceData.val() != null){
                                        this.setState({ price: currPriceData.val() });
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
    

    render(){
        if(sessionStorage.getItem("ROLE") == "ADMIN"){
            return(
                <>
                <Navbar />
                <div className="main-content">
                    <div className="section-content section-content-p30">
                        <div className="container">
                            <br/>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="20%"><input type="test" class="pname" defaultValue={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}}></input></th>
                                        <th width="60%"><h5>Opis</h5></th>
                                        <th width="20%"><h5>Cena w EUR</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <img src={this.state.url} class="img-responsive" width="290px"/>
                                    </td>
                                    <td>
                                        <textarea className="form-control" id="description" name="description" rows="9"
                                            defaultValue={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}>
                                        </textarea>
                                    </td>
                                    <td>
                                        <input type="number" min="1" step="0.01" class="pprice" value={this.state.price} onChange={(e) => {this.setState({price: e.target.value})}}></input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="btn btn-success w-100 mt-3" onClick={
                                () => {updateProduct(this.state.id, this.state.title, this.state.description, this.state.price, this.props.history)}
                                }>Zaktualizuj Produkt
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        } else {
            return(
                <>
                <Navbar />
                <div className="main-content">
                    <div className="section-content section-content-p30">
                        <div className="container">
                            <br/>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="20%"><h4>{this.state.title}</h4></th>
                                        <th width="50%"><h5>Opis</h5></th>
                                        <th width="30%"><h5>Cena</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <img src={this.state.url} class="img-responsive" width="290px"/>
                                    </td>
                                    <td>
                                        {this.state.description}
                                    </td>
                                    <td>
                                        {Number(this.state.price * sessionStorage.getItem("EURO_RATE")).toFixed(2)} PLN
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="btn btn-success w-100 mt-3" onClick={
                                () => {createCartItem(this.state.url, this.state.title, this.state.price, this.state.description, this.props.history)}
                                }>Dodaj do zamówienia
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        }

    }
}

function createCartItem(url, title, price, description, propsHistory){

    const cartItem = {
        url: url,
        title: title,
        price: price,
        description: description,
        quantity: 1
    }

    
    addToCart(cartItem)
    computeCartTotals()
    propsHistory.push("/order")
}

function updateProduct(id, title, description, price, propsHistory){

    const product = {
        title: title,
        description: description,
        price: price
    }

    const productRef = app.database().ref("Products").child(id).update(product).then(data => {
        propsHistory.push("/")
    })

}