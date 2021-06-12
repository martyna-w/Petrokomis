import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "../Products/style.css";



export default function OrderProduct({ product }) {


    var userRole = sessionStorage.getItem("ROLE")


        const useStyles = makeStyles({
            media: {
            height: 220,
            padding: '10 px 10px 0 10px',
            },
        });

        const classes = useStyles();


    if (userRole == "ADMIN" || userRole == "BASIC_USER"){
        return(

        <>
        <tr>
            <td>
                <img src={product.url} class="img-responsive" width="115px"/>
            </td>
            <td>
                {product.description}
            </td>
            <td>
                {product.quantity}
            </td>
        </tr>
        </>
        )
    }
}