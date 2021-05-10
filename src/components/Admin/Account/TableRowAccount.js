import React from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'

function TableRowUser (props) {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    const delDoctor =  async () => {
        axios.delete('http://localhost:9000/api/member/delete/'+ props.obj._id)
            .then(
                toast.success('Xóa thành công!')  
            )
            .catch(err => console.log(err))
            window.location.reload()
    }
    return (
        <tr>
            <td>{props.obj.username}</td>
            <td>{props.obj.password}</td>
            <td>{props.obj.idRole.name}</td>
             <td>
            <Link to={"/editaccount/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delDoctor}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRowUser;