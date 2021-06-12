import React from 'react'
import app from "../firebase"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Card, 
CardActionArea,
CardActions,
CardContent,
CardMedia,
Button,
Typography
} from '@material-ui/core';
import { ShoppingCart } from "@material-ui/icons"
import "./style.css";
import { addToCart, computeCartTotals } from '../Cart/CartService';



export default function Product({ product }) {

  const history = useHistory();

  var userRole = sessionStorage.getItem("ROLE")
  var euroRate = sessionStorage.getItem("EURO_RATE")

        const deleteProduct = () => { 
            const productRef = app.database().ref("Products").child(product.id);
            productRef.remove();
        }

        const useStyles = makeStyles({
          media: {
            height: 220,
            padding: '10 px 10px 0 10px',
          },
        });

        const classes = useStyles();


    if (userRole === "ADMIN"){
      return(
        <div class="card-one">
        <Card className="custom-card-one">
          <CardActionArea onClick={() => {history.push("/details/" + product.title)}}>
          <CardMedia
            className={classes.media}
            image={product.url}
          />
          <CardContent className="content">
            <Typography
              className="title"
              gutterBottom
              variant="h6"
              component="h2"
              align="center"
            >
              {product.title}
            </Typography>
          <Typography
              className="price"
              gutterBottom
              variant="h6"
              component="h2"
              align="center"
            >
              {Number(product.price * euroRate).toFixed(2)} PLN
          </Typography>
          </CardContent>
          </CardActionArea>
          <div size="small" className="btn btn-success w-100 mt-1" onClick={deleteProduct}><i class="fas fa-trash-alt" style={{"padding-right": "5px"}}> </i>   USUŃ</div>
        </Card>
        </div>
      )
    } else if (userRole === "BASIC_USER"){
      return(
        <div class="card-two">
        <Card className="custom-card-two">
          <CardActionArea onClick={() => {history.push("/details/" + product.title)}}>
          <CardMedia
            className={classes.media}
            image={product.url}
          />
          <CardContent className="content">
            <Typography
              className="title"
              gutterBottom
              variant="h6"
              component="h2"
              align="center"
            >
              {product.title}
            </Typography>
          <Typography
              className="price"
              gutterBottom
              variant="h6"
              component="h2"
              align="center"
            >
              {Number(product.price * euroRate).toFixed(2)} PLN
            </Typography>
            </CardContent>
        </CardActionArea>
          <CardActions className="actions-content">
          <Button
                variant="contained"
                className="custom-button"
                onClick={() => {
                  createCartItem()
                }}
              >
                <ShoppingCart /> Dodaj do zamówienia
          </Button>
          </CardActions>
        </Card>
        </div>
      )
    } else{
      return (
      <div class="card-three">
        <Card className="custom-card-three">
          <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.url}
          />
          <CardContent className="content">
            <Typography
              className="title"
              gutterBottom
              variant="h6"
              component="h2"
              align="center"
              >
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
          <CardActions className="actions-content">
          </CardActions>
        </Card>
        </div>
      )
    }

    function createCartItem(){
      const cartItem = {
        url: product.url,
        title: product.title,
        price: product.price,
        description: product.description,
        quantity: 1
      }

      
      addToCart(cartItem)
      computeCartTotals()
    }
  }

