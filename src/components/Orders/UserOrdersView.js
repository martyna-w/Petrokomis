import React, {useState, useEffect} from 'react'
import app from "../firebase"
import Navbar from '../NavBar';
import OrdersListInfo from './OrdersListInfo';

export default function UserOrdersView() {
    const [ordersList, setOrders] = useState();
    
    useEffect(() => {
        const OrderRef = app.database().ref('Orders');
        OrderRef.on('value', (snapshot) => {
            const orders = snapshot.val();
            const ordersList = []
            for (let id in orders){
                if(orders[id]['email'] == sessionStorage.getItem("EMAIL")){
                    ordersList.push({id, ... orders[id]});
                }
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
                                <th width="24%">Id zamówienia</th>
                                <th width="20%">Data zamówienia</th>
                                <th width="16%">Status</th>
                                <th width="16%">Suma</th>
                                <th width="19%"></th>
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