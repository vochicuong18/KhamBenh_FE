import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://113.173.154.51:9000/api/diagnostic/delete/'+ this.props.obj._id)
            .then(console.log(this.props.obj.id)) 
            .catch(err => console.log(err))
            window.location.reload();                
    }

    render() {      
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.symptom}</td>
                <td>{this.props.idFaculty}</td>
                <td>
                <Link to={"/editdiagnosis/"+ this.props.obj._id}>
                    <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <button className='btn__row' onClick = {this.delete}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
                </td>
            </tr>       
        );
    }
}

export default TableRow;