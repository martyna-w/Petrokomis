import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import "../Products/style.css";
import { computeCartTotals, removeFromCart } from './CartService';
import "./style.css";



export default function CartProduct({ product }) {


    let [quantity, setQuantity] = useState(product.quantity)
    var userRole = sessionStorage.getItem("ROLE")
    var euroRate = sessionStorage.getItem("EURO_RATE")

        const useStyles = makeStyles({
            media: {
            height: 220,
            padding: '10 px 10px 0 10px',
            },
        });

        const classes = useStyles();


    if (userRole === "BASIC_USER" || userRole == "ADMIN"){
        return(

        <>
        <tr>
            <td>
                <img src={product.url} class="img-responsive" width="130px"/>
            </td>
            <td>
                {product.description}
            </td>
            <td>
                <div>
                    <label> </label>
                    <div class="grid-container">
                        <div class="grid-item">
                            <Button
                                className="btnP"
                                onClick={() => {
                                    incrementQuantity()
                                }}><i class="fas fa-plus fa-lg"></i>
                            </Button>
                        </div>
                        <input type="number" min="1" step="1" value={quantity} class="grid-item1" onKeyUp={(event) => {
                        
                        }}  onChange={(e)=> {
                            
                            setQuantity(Math.abs(Math.round(e.target.value)))
                            product.quantity = Math.abs(Math.round(e.target.value))
                            computeCartTotals()
                            }}>
                        </input>
                        <div class="grid-item">
                            <Button
                                className="btnM"
                                onClick={() => {
                                    decrementQuantity()
                                }}><i class="fas fa-minus fa-lg"></i>
                            </Button>
                        </div>
                    </div>
                    <br/>
                <h5>Cena: {(product.quantity * product.price * euroRate).toFixed(2)} PLN</h5>
                </div>
                <div>
                        <br/>
                        <div className="btn-sm btn-success" onClick={() => {removeFromCart(product)}} >
                            Usuń produkt
                        </div>
                        </div>
            </td>
        </tr>

        </>
        )
    }
    function incrementQuantity(){
        product.quantity = product.quantity + 1
        computeCartTotals()
        setQuantity(++quantity)
    }

    function decrementQuantity(){
        if(quantity > 1){
            product.quantity = product.quantity - 1
            computeCartTotals()
            setQuantity(--quantity)
        }
    }
}