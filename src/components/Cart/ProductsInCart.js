import React from 'react'
import CartProduct from './CartProduct'
import { productsInCart } from './CartService'

export default function ProductsInCart() {


    return (
        <>{productsInCart ? productsInCart.map((product, index) => <CartProduct product={product} key={index}/>) : ''}</>

    )
}