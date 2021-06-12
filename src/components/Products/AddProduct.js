import React, { useState } from 'react'
import app from "../firebase"
import { v4 as uuid } from "uuid"
import { useInput } from "../../Hooks/useInput"
import { Form}  from "react-bootstrap"
import "./style.css";

export default function AddProduct() {
    const { value:title, bind:bindTitle } = useInput('');
    const { value:description, bind:bindDescription } = useInput('');
    const { value:price, bind:bindPrice } = useInput('');
    const [imageUrl, setImageUrl] = useState([]);
    const [url, setUrl] = useState('');


    const createProduct = () => {
        const productRef = app.database().ref("Products")

        const product = {
        title,
        description,
        price,
        url,
    }

    productRef.push(product);
    };

    const readImages = async (e) => {
        const file = e.target.files[0];
        const id = uuid();
        const storageRef = app.storage().ref('Images').child(id);

        await storageRef.put(file);
        storageRef.getDownloadURL().then((url) => {

            const newState = [... imageUrl, { id, url }];
            setImageUrl(newState);
            setUrl(url);
        });
    }

    return (
        <div class="container-sm">
            <br />
        <Form>
            <Form.Group>
                <Form.Label>Wpisz nazwę</Form.Label>
                <br />
                <input 
                        type="text"
                        class="name" 
                        {...bindTitle}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Wpisz opis</Form.Label>
                <br />
                <textarea 
                class="des" 
                    {...bindDescription}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Wpisz cenę w EUR</Form.Label>
                <br />
                <input
                type="number" min="1" step="any"
                class="price1" 
                {...bindPrice} 
                />
            </Form.Group>
            <Form.Group>
                <br />
                <div class="file-input">
                <input class="file" type="file" accept="image/*" onChange={readImages} />
                <label for="file">Wybierz obraz</label>
                {imageUrl
                ? imageUrl.map(({ id, url }) => {
                 })
                : ''}
                </div>
            </Form.Group>
            <a href="/" className="btn btn-success w-100 mt-4" onClick={createProduct}>DODAJ PRODUKT</a>
        </Form>
        </div>
    );
}