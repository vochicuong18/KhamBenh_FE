import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Admin from '../page/admin';
import Home from '../page/home';
import Edit from './Admin/Bacsi/Edit';
import Login from '../page/Login';
import ListDoc from '../page/listdoctor';
import Ketqua from '../page/Ketqua'
import DashboardDoctor from './Admin/Bacsi/Dashboard';
import DBoardListKhoa from './Admin/Khoa/DashboardKhoa'
import EditKhoa from './Admin/Khoa/EditKhoa';
import Diagnosis from './Admin/Diagnosis/DashboardDiagnosis';
import EditDiagnosis from './Admin/Diagnosis/EditDiagnosis';
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

            <Route path = "/admin-doctor" > < DashboardDoctor / > </Route> 
            <Route path = "/admin-khoa" > < DBoardListKhoa / > </Route>

            <Route path = "/editkhoa/:_id"
            render = {
                (props) => ( <EditKhoa {...props }
                    key = { this.props._id }/>
                )
            }> </Route>
            <Route path = "/admin-chandoan" > <Diagnosis/>
            </Route> 
            <Route path = "/editdiagnosis/:id"
            render = {
                (props) => ( <EditDiagnosis {...props }
                    key = { this.props.id }/>
                )
            } > </Route> 
            <Route path = "/result"> <Ketqua/> </Route>
             <Route> <Home/> </Route> 
            </Switch> 
            </div>
        )
    }
}