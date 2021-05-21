import React from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'

function TableRowUser (props) {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    console.log( props.obj._id);
    const delDoctor =  async () => {
        axios.delete(process.env.REACT_APP_API_URL+'/api/member/delete/'+ props.obj._id)
        .then() 
        .catch(err => console.log(err))
        window.location.reload();       
}
    return (
        <tr>
            <td></td>
            <td>{props.obj.idUser.fullname}</td>
            <td>{props.obj.idUser.address}</td>
            <td>{props.obj.idUser.phoneNumber}</td>
            <td>{props.obj.idUser.mail}</td>
            <td>{props.obj.idUser.idAccount.username}</td>
            <td>{props.obj.idUser.idAccount.password}</td>
            <td width="200"><Image src={props.obj.idUser.avatar} style={{objectFit: 'cover',height:'50px',width:'50px'}}/></td>
            <td>
            <Link to={"/edituser/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delDoctor}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRowUser;