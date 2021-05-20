import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Admin from '../page/admin';
import Home from '../page/home';
import Edit from './Admin/Bacsi/Edit';
import Login from '../page/Login';
import ListDoc from '../page/listdoctor';
import Ketqua from '../page/Booking1'
import DashboardDoctor from './Admin/Bacsi/Dashboard';
import DashboardBook from './Admin/Book/DashboardBooking';
import DBoardListKhoa from './Admin/Khoa/DashboardKhoa'
import EditKhoa from './Admin/Khoa/EditKhoa';
import Diagnosis from './Admin/Diagnosis/DashboardDiagnosis';
import EditDiagnosis from './Admin/Diagnosis/EditDiagnosis';
import DBoardListUser from './Admin/User/DashboardUser'
import EditUser from './Admin/User/EditUser';
import DashboardAccount from './Admin/Account/DashboardAccount'
import EditAccount from './Admin/Account/EditAccount'
import Booking from '../page/booking'
import Historybook from '../components/Booking/Historybook'
import EditBook from '../components/Admin/Book/EditBook'
import ForgotPass from '../components/Password/ForgotPass'
import ChangePass from '../components/Password/ChangePass'
// import Result from './Result/Result';
export default class RouterURL extends Component {
    render() {
        return ( 
        <div>
            <Switch >
                <Route exact path = "/" > <Login/></Route> 
                <Route path = "/home" > <Home/> </Route>
                <Route path = "/admin" > <Admin/>
                </Route> <Route path = "/list-doc" ><ListDoc/></Route>

                <Route path = "/edit/:_id"
                    render = {
                        (props) => (<Edit {...props}
                            key = {this.props._id}/>
                        )
                    }> 
                </Route>
                <Route path = "/forgotpassword"><ForgotPass/></Route>
                <Route path = "/change-pass"><ChangePass/></Route>
                <Route path = "/admin-doctor" > <DashboardDoctor / > </Route> 
                <Route path = "/admin-khoa" > <DBoardListKhoa / > </Route>
                <Route path = "/admin-user"><DBoardListUser/></Route>
                <Route path = "/admin-account"><DashboardAccount/></Route>
                <Route path = "/admin-book"> <DashboardBook / > </Route> 
                <Route path = "/edituser/:_id"
                    render = {
                        (props) => ( <EditUser {...props}
                            key = {this.props._id}/>
                        )
                    }> 
                </Route>
                <Route path = "/editkhoa/:_id"
                    render = {
                        (props) => ( <EditKhoa {...props }
                            key = { this.props._id }/>
                        )
                    }> 
                </Route>
                <Route path = "/editbook/:_id"
                    render = {
                        (props) => ( <EditBook {...props }
                            key = { this.props._id }/>
                        )
                    }> 
                </Route>
                <Route path = "/admin-chandoan" > <Diagnosis/>
                </Route> 

                <Route path = "/editaccount/:_id"
                    render = {
                        (props) => ( <EditAccount {...props }
                            key = { this.props._id }/>
                        )
                    }> 
                </Route>

                <Route path = "/editdiagnosis/:_id"
                    render = {
                        (props) => ( <EditDiagnosis {...props}
                            key = { this.props._id}/>
                        )
                    } >
                </Route> 
                <Route path = "/result"> <Ketqua/> </Route>
                <Route path = "/booking"><Booking/> </Route>
                <Route path = "/history-book"><Historybook/></Route>
               
                <Route> <Home/> </Route> 
            </Switch> 
        </div>
        )
    }
}