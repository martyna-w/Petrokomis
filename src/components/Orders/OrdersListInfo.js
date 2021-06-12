import { useHistory } from 'react-router-dom';


export default function OrdersListInfo({ order }) {

    const history = useHistory();


    if(sessionStorage.getItem("ROLE") == "ADMIN"){
        return(
            <>
                <tr>
                    <td>
                        {order.id}
                    </td>
                    <td>
                        {order.orderDate}
                    </td>
                    <td>
                        {order.email}
                    </td>
                    <td>
                        {order.status}
                    </td>
                    <td>
                        {order.shippingPrice == ""
                        ? (Number(order.totalPrice) * ((100-order.discount) / 100)).toFixed(2)
                        : ((Number(order.totalPrice) * ((100-order.discount) / 100)) + Number(order.shippingPrice)).toFixed(2)} PLN
                    </td>
                    <td>
                        <div className="btn btn-success" onClick={() => {history.push("/order/" + order.id)}}>Szczegóły zamówienia</div>
                    </td>
                </tr>
            </>
        )
    } else if(sessionStorage.getItem("ROLE") == "BASIC_USER"){
        return(
            <>
                <tr>
                    <td>
                        {order.id}
                    </td>
                    <td>
                        {order.orderDate}
                    </td>
                    <td>
                        {order.status}
                    </td>
                    <td>
                        {order.shippingPrice == ""
                        ? (Number(order.totalPrice) * ((100-order.discount) / 100)).toFixed(2)
                        : ((Number(order.totalPrice) * ((100-order.discount) / 100)) + Number(order.shippingPrice)).toFixed(2)} PLN
                    </td>
                    <td>
                        <div className="btn btn-success" onClick={() => {history.push("/myorder/" + order.id)}}>Szczegóły zamówienia</div>
                    </td>
                </tr>
            </>
        )
    }

}
