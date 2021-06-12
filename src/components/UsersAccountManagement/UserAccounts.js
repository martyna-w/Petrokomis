import React, {useState, useEffect} from 'react'
import AccountEmails from './AccountEmails';
import app from "../firebase"
import Navbar from '../NavBar';

export default function UserAccounts() {
    const [emailList, setEmails] = useState();
    
    useEffect(() => {
        const productRef = app.database().ref('UsersAccounts');
        productRef.on('value', (snapshot) => {
            const emails = snapshot.val();
            const emailList = []
            for (let id in emails){
                emailList.push({id, ... emails[id]});
            }
        
            setEmails(emailList);
        })
    },[]);

    return(
        <>
        <Navbar />
        <br/>
        <div class="container">
        <div className="main-content">
            <div className="section-content section-content-p30">
                <div className="container-fluid">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="30%">Adres Email</th>
                                <th width="22%">Status Konta</th>
                                <th width="22%">Rabat</th>
                                <th width="15%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <>{emailList ? emailList.map((account, index) => <AccountEmails account={account} key={index}/>) : ''}</>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        </>
    )

}