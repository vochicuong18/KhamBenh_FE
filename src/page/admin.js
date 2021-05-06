import React,{ Component } from 'react';
import './assets/dashboard.css'
import Dashboard from '../components/Admin/Dashboard';
import './assets/listdoc.css'

class admin extends Component {
    render () {
        return(
            <div>
                <Dashboard></Dashboard>
            </div>            
        )
    };
}
export default admin;