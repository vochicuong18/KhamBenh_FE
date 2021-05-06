import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
// import Image from 'react-bootstrap/Image'

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://localhost:9000/khoa/delete/'+ this.props.obj._id)
            .then(console.log(this.props.obj.id)) 
            .catch(err => console.log(err))
            window.location.reload();       
    }

    render() {      
        return (
            <tr>
                <td>{this.props.obj._id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.description}</td>
                <td width="200">{this.props.obj.logo}</td>
                {/* <td width="200"><Image src={this.props.obj.logo} width="25%" /></td> */}
                <td>
                <Link to={"/editkhoa/"+ this.props.obj._id}>
                    <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <button className='btn__row' onClick = {this.delete}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
                </td>
            </tr>       
        // <tr>
        //     <td>{this.props.obj.temp}</td>
        //     <td>{this.props.obj.timeStamp}</td>
        //     <td>{this.props.obj.co2}</td>
        //     <td>{this.props.obj.hum}</td>
        //     {/* <td><Image src={this.props.obj.logo} width="10%" roundedCircle /></td> */}
        //     <td>
        //     <Link to={"/edit/"+ this.props.obj.id}>
        //         <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
        //     </Link>

        //     <button className='btn__row' onClick = {this.delete}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
        //     </td>
        // </tr>     
        );
    }
}

export default TableRow;