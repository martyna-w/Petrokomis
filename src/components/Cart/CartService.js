import { Subject } from 'rxjs';
import app from "../firebase"

export const productsInCart = []
export let totalPrice = new Subject()
export let totalQuantity = new Subject()
export let totalPriceDouble = 0
export let totalQuantityDouble = 0

export const addToCart = (cartItem) => {
    let alreadyExistsInCart = false;

    if (productsInCart.length > 0){
        for(let tempCartProduct in productsInCart){

            if(productsInCart[tempCartProduct].url == cartItem.url){
                alreadyExistsInCart = true;
            }
        }
    }
    if(alreadyExistsInCart){
    } else {
        productsInCart.push(cartItem);

    }

}

export const computeCartTotals = () => {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for(let currentCartItem in productsInCart){
        totalPriceValue += productsInCart[currentCartItem].quantity * productsInCart[currentCartItem].price
        totalQuantityValue += productsInCart[currentCartItem].quantity
    }

    totalPrice.next(totalPriceValue)
    totalPriceDouble = totalPriceValue
    totalQuantity.next(totalQuantityValue)
    totalQuantityDouble = totalQuantityValue
}

export const removeFromCart = (cartItem) =>{

    const itemIndex = productsInCart.findIndex(
        tempCartItem => tempCartItem.url === cartItem.url
    );

    if(itemIndex > -1){
        productsInCart.splice(itemIndex, 1);

        computeCartTotals();
    }
}

export const submitOrder = (orderDate, discount, orderTotalPrice, shippingInfo) => {

    const orderRef = app.database().ref("Orders")
    const orderInfo = {
        productsinOrder: productsInCart,
        email: sessionStorage.getItem("EMAIL"),
        status: "wysłane",
        discount: discount,
        totalPrice: orderTotalPrice,
        orderDate: orderDate,
        shippingDate: "",
        shippingPrice: "",
        orderComment: "",
        shippingInfo: shippingInfo
        
    }

    orderRef.push(orderInfo);
}
