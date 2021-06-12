import { useHistory } from 'react-router-dom';


export default function AccountEmails({ account }) {

    const history = useHistory();

    return(
        <>
            <tr>
                <td>
                    {account.email}
                </td>
                <td>
                    {account.status}
                </td>
                <td>
                    {account.discount} %
                </td>
                <td>
                    <div className="btn btn-success" onClick={() => {history.push("/account/" + account.email)}}>EDYCJA KONTA</div>
                </td>
            </tr>
        </>
    )
}
