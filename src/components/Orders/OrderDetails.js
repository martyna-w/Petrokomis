import React from 'react';
import { Link } from 'react-router-dom';
import app from "../firebase";
import Navbar from '../NavBar';
import OrderProduct from './OrderProduct';
import "./style.css";

export default class OrderDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.id,
            totalPrice: "",
            discount: "",
            email: "",
            status: "",
            productsinOrder: [],
            orderComment: "",
            orderDate: "",
            shippingDate: "",
            shippingPrice: "",
            shippingInfo: ""
        };
    }

    componentDidMount() {

        

        const orderRef = app.database().ref("Orders").child(this.state.id).once('value').then(data => {
            if(data.val() != null){
                this.setState({totalPrice: data.val()['totalPrice']})
                this.setState({discount: data.val()['discount']})
                this.setState({email: data.val()['email']})
                this.setState({status: data.val()['status']})
                this.setState({productsinOrder: data.val()['productsinOrder']})
                this.setState({orderComment: data.val()['orderComment']})
                this.setState({orderDate: data.val()['orderDate']})
                this.setState({shippingDate: data.val()['shippingDate']})
                this.setState({shippingPrice: data.val()['shippingPrice']})
                this.setState({shippingInfo: data.val()['shippingInfo']})
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
                                        <th width="25%">ID zamówienia</th>
                                        <th width="25%">Status zamówienia</th>
                                        <th width="25%">Złożone przez</th>
                                        <th width="25%">Data zamówienia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {this.state.id}
                                    </td>
                                    <td>
                                        <select class="custom-select" name="status" id="status" value={this.state.status} onChange={(e) => {this.setState({status: e.target.value})}}>
                                            <option value="wysłane">Wysłane</option>
                                            <option value="przyjęte">Przyjęte do realizacji</option>
                                            <option value="zrealizowane">Zrealizowane</option>
                                        </select>
                                    </td>
                                    <td>
                                        {this.state.email}
                                    </td>
                                    <td>
                                        {this.state.orderDate}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="25%">Wartość netto</th>
                                        <th width="25%">Rabat</th>
                                        <th width="25%">Koszt dostawy</th>
                                        <th width="25%">Suma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {this.state.totalPrice} PLN
                                    </td>
                                    <td>
                                        {this.state.discount} %
                                    </td>
                                    <td>
                                        {this.state.shippingPrice == ""
                                        ? <input type="number" step="0.1" placeholder="PLN" class="shippingPrice" onChange={(e) => {this.setState({shippingPrice: e.target.value})}}></input>
                                        : <input type="number" step="0.1" class="shippingPrice" defaultValue={this.state.shippingPrice} onChange={(e) => {this.setState({shippingPrice: e.target.value})}}></input>} 
                                    </td>
                                    <td>
                                        {this.state.shippingPrice == ""
                                        ? (this.state.totalPrice * ((100-this.state.discount) / 100)).toFixed(2) + " PLN"
                                        : (this.state.totalPrice * ((100-this.state.discount) / 100) + Number(this.state.shippingPrice)).toFixed(2) + " PLN"}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="25%">Termin Dostawy</th>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {this.state.shippingDate == "" 
                                            ? <input type="date" class="date" onChange={(e) => {this.setState({shippingDate: convertDateToOutput(e.target.value)})}}></input>
                                            : <input type="date" class="date" value={convertDateToInput(this.state.shippingDate)} onChange={(e) => {this.setState({shippingDate: convertDateToOutput(e.target.value)})}}></input>} 
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>                          
                            <br/>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="32%">Zdjęcie</th>
                                        <th width="40%">Opis</th>
                                        <th width="28%">Ilość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>{this.state.productsinOrder ? this.state.productsinOrder.map((product, index) => <OrderProduct product={product} key={index}/>) : ''}</>
                                </tbody>
                            </table>
                            <br/>
                            <h4>Dane do wysyłki</h4>
                            <div className="input-group">
                                <textarea className="form-control" id="shippingInfo" name="shippingInfo" rows="4"
                                            value={this.state.shippingInfo} disabled>
                                </textarea>
                            </div>
                            <br/><br/>
                            <h4>Uwagi do zamówienia</h4>
                            <div className="input-group">
                                <textarea className="form-control" id="orderComment" name="orderComment" rows="4"
                                        defaultValue={this.state.orderComment} onChange={(e) => {this.setState({orderComment: e.target.value})}}>
                                </textarea>
                            </div>
                            <br/>
                            <h1 size="large" className="btn btn-success w-100 mt-3" onClick={() => {
    
                                updateOrderInfo(this.state.id, this.state.status, this.state.orderComment, this.state.shippingDate, Number(this.state.shippingPrice).toFixed(2), this.props.history)
                            }}>Zatwierdź zmiany
                            </h1>
                            <Link to="/orders" size="large" className="btn btn-success w-100 mt-3">Powrót do listy zamówień
                            </Link>
                        </div>
                    </div>
                </div>
                <br />
                </>
            )
        } else if(sessionStorage.getItem("ROLE") == "BASIC_USER"){
            return(
                <>
                <Navbar />
                <div className="main-content">
                    <div className="section-content section-content-p30">
                        <div className="container">
                            <br />
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="30%">ID zamówienia</th>
                                        <th width="20%">Status zamówienia</th>
                                        <th width="25%">Data zamówienia</th>
                                        <th width="25%">Data wysyłki</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {this.state.id}
                                    </td>
                                    <td>
                                        {this.state.status}
                                    </td>
                                    <td>
                                        {this.state.orderDate}
                                    </td>
                                    <td>
                                        {this.state.shippingDate == "" ? "-" : this.state.shippingDate}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="30%">Wartość netto</th>
                                        <th width="20%">Rabat</th>
                                        <th width="25%">Koszt dostawy</th>
                                        <th width="25%">Suma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {this.state.totalPrice} PLN
                                    </td>
                                    <td>
                                        {this.state.discount} %
                                    </td>
                                    <td>
                                    {this.state.shippingPrice == "" ? "-" : this.state.shippingPrice + " PLN"}
                                    </td>
                                    <td>
                                        {this.state.shippingPrice == ""
                                        ? (this.state.totalPrice * ((100-this.state.discount) / 100)).toFixed(2) + " PLN"
                                        : (this.state.totalPrice * ((100-this.state.discount) / 100) + Number(this.state.shippingPrice)).toFixed(2) + " PLN"}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="30%">Zdjęcie</th>
                                        <th width="45%">Opis</th>
                                        <th width="25%">Ilość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>{this.state.productsinOrder ? this.state.productsinOrder.map((product, index) => <OrderProduct product={product} key={index}/>) : ''}</>
                                </tbody>
                            </table>
                            <br/>
                            <h4>Dane do wysyłki</h4>
                            <div className="input-group">
                                <textarea className="form-control" id="shippingInfo" name="shippingInfo" rows="4"
                                            value={this.state.shippingInfo} disabled>
                                </textarea>
                            </div>
                            <br/><br/>
                            <h4>Uwagi do zamówienia</h4>
                            <div className="input-group">
                                <textarea className="form-control" id="orderComment" name="orderComment" rows="4"
                                            value={this.state.orderComment} disabled>
                                </textarea>
                            </div>
                            <br/>
                            <Link to="/myorders" size="large" className="btn btn-success w-100 mt-3">Powrót do listy zamówień
                            </Link>
                        </div>
                    </div>
                </div>
                <br />
                </>
            )
        }
    }
}

function updateOrderInfo(id, status, orderComment, shippingDate, shippingPrice, propsHistory){

    const OrderInfo = {
        status: status,
        orderComment: orderComment,
        shippingDate: shippingDate,
        shippingPrice: shippingPrice
    }
    const orderRef = app.database().ref("Orders").child(id).update(OrderInfo).then(data => {
        propsHistory.push("/orders")
    })
}

function convertDateToInput(date){
    var datearray = date.split(".");
    var dd = datearray[0]

    if(dd < 10){
        dd = '0' + dd
    }
    var newdate = datearray[2] + '-' + datearray[1] + '-' + dd;
    return newdate;
    
}

function convertDateToOutput(date){
    var datearray = date.split("-");
    var dd = datearray[2]

    if(dd < 10){
        dd = Number(dd)
    }
    var newdate = dd + '.' + datearray[1] + '.' + datearray[0];
    return newdate;
    
}