import React from 'react';
import app from "../firebase";
import Navbar from '../NavBar';
import "./style.css";

export default class ManageUserAccount extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: props.match.params.email,
            discount: "",
            role: "",
            status: ""
        };
    }

    componentDidMount() {
        const userRef = app.database().ref("UsersAccounts").once('value').then(data => {
            if (data.val() != null){
                for(let id in data.val()){
                    const currUSerRef = app.database().ref("UsersAccounts").child(id).child("email").once('value').then(currData => {
                        if (currData.val() != null){
                            if (currData.val() == this.state.email){

                                const currUserDiscount = app.database().ref("UsersAccounts").child(id).child("discount").once('value').then(currDiscountData => {
                                    if(currDiscountData.val() != null){
                                        this.setState({ discount: currDiscountData.val() });
                                    }
                                })

                                const currUserRole = app.database().ref("UsersAccounts").child(id).child("role").once('value').then(currRoleData => {
                                    if(currRoleData.val() != null){
                                        this.setState({ role: currRoleData.val() });
                                    }
                                })

                                const currUserStatus = app.database().ref("UsersAccounts").child(id).child("status").once('value').then(currStatusData => {
                                    if(currStatusData.val() != null){
                                        this.setState({ status: currStatusData.val() });
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    render(){
        return(
            <>
            <Navbar />
            <br/>
            <div class="container">
            <div className="main-content">
                <div className="section-content section-content-p30">
                    <div className="container-fluid">
                        <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            {this.state.title}
                        </h1>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th width="40%">Adres Email</th>
                                    <th width="20%">Status Konta</th>
                                    <th width="20%">Rabat %</th>
                                    <th width="20%">Uprawnienia</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {this.state.email}
                                </td>
                                <td>
                                    {this.state.status == "inactive" ? 
                                        <select class="custom-select" name="status" id="status">
                                            <option value="inactive" selected="selected">Niekatywne</option>
                                            <option value="active">Aktywne</option>
                                        </select> :
                                        <select class="custom-select" name="status" id="status">
                                            <option value="active" selected="selected">Aktywne</option>
                                            <option value="inactive">Niekatywne</option>
                                        </select>
                                    }

                                </td>
                                <td>
                                    <input type="number" min="0" max="100" id="discount" class="discount" defaultValue={this.state.discount}></input> 
                                </td>
                                <td>
                                    {this.state.role == "ADMIN" ? 
                                        <select class="custom-select" name="role" id="role">
                                            <option value="ADMIN" selected="selected">Admin</option>
                                            <option value="BASIC_USER">Użytkownik</option>
                                        </select> :
                                        <select class="custom-select" name="role" id="role">
                                            <option value="BASIC_USER" selected="selected">Użytkownik</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div size="large" className="btn btn-success w-100 mt-3" onClick={() => {
                            let status = document.getElementById("status")
                            let discount = document.getElementById("discount")
                            let role = document.getElementById("role")
                            updateAccountInfo(this.state.email, status.value, discount.value, role.value, this.props.history)
                        }}>Zatwierdź zmiany
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

function updateAccountInfo(email, status, discount, role, propsHistory){

    const userInfo = {
        email,
        role,
        discount,
        status
    }

    const userRef = app.database().ref("UsersAccounts").once('value').then(data => {
        if (data.val() != null){
            for(let id in data.val()){
                const currUSerRef = app.database().ref("UsersAccounts").child(id).child("email").once('value').then(currData => {
                    if (currData.val() != null){
                        if (currData.val() == email){

                            const userInfoRef = app.database().ref("UsersAccounts").child(id).update(userInfo).then(() => {
                                propsHistory.push("/accounts")
                            })
                        }
                    }
                })
            }
        }
    })
}