import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://10.200.0.160:9000/api/doctor/delete/'+ this.props.obj._id)
            .then(console.log(this.props.obj._id)) 
            .catch(err => console.log(err))
            window.location.reload();       
    }
    render() {      
        return (
            <tr>
                <td>{this.props.obj.fullname}</td>
                <td>{this.props.obj.Faculty.name}</td>
                <td>{this.props.obj.address}</td>
                <td>{this.props.obj.degree}</td>
                <td width="200"><Image src={this.props.obj.avatar} width="25%" /></td>
                <td>
                <Link to={"/edit/"+ this.props.obj.id}>
                    <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>

                <button className='btn__row' onClick = {this.delete}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
                </td>
            </tr>       
        );
    }
}

export default TableRow;