import React, {useState, useEffect} from 'react'
import app from "../firebase"
import Navbar from '../NavBar';
import OrdersListInfo from './OrdersListInfo';

export default function OrdersView() {
    const [ordersList, setOrders] = useState();
    
    useEffect(() => {
        const OrderRef = app.database().ref('Orders');
        OrderRef.on('value', (snapshot) => {
            const orders = snapshot.val();
            const ordersList = []
            for (let id in orders){
                ordersList.push({id, ... orders[id]});
            }
        
            setOrders(ordersList.reverse());
        })
    },[]);

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
                                <th width="22%">Id zamówienia</th>
                                <th width="16%">Data zamówienia</th>
                                <th width="21%">Zamawiający</th>
                                <th width="11%">Status</th>
                                <th width="13%">Cena</th>
                                <th width="17%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <>{ordersList ? ordersList.map((order, index) => <OrdersListInfo order={order} key={index}/>) : ''}</>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )

}
