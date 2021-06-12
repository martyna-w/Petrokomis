import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import app from "../firebase"
import Product from "./Product"

export default function Products() {
    const [productsList, setProducts] = useState([]);
    const params = useParams()
    
    useEffect(() => {
        const productRef = app.database().ref('Products');
        productRef.on('value', (snapshot) => {
          const products = snapshot.val();
          const productsList = []
          for (let id in products){
            productsList.push({id, ... products[id]});
          }

          setProducts(productsList);
        })
      },[]);

      if(params.keyword != undefined){
        return (
          <div>{productsList ? productsList.filter((item) => {return item['title'].toLowerCase().indexOf(params.keyword.toLowerCase()) > -1}).map((product, index) => <Product product={product} key={index}/>) : ''}</div>
  
        )
        
      } else {
        return (
          <div>{productsList ? productsList.map((product, index) => <Product product={product} key={index}/>) : ''}</div>
  
      )
      }
}