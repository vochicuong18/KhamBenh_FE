import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'
import NumberFormat from 'react-number-format';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete(process.env.REACT_APP_API_URL+'/api/faculty/delete/'+ this.props.obj._id)
            .then(console.log(this.props.obj._id)) 
            .catch(err => console.log(err))
            window.location.reload();       
    }

    render() {      
        return (
            <tr>
                <td></td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <NumberFormat value = {this.props.obj.price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/>
                </td>
                <td width="200"><Image src={this.props.obj.logo} width="25%" /></td>
                <td>
                <Link to={"/editkhoa/"+ this.props.obj._id}>
                    <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <button disabled className='btn__row' onClick = {this.delete}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
                </td>
            </tr>       
        );
    }
}

export default TableRow;