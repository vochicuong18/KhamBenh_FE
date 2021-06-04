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
    const Swal = require('sweetalert2')
    const delDoctor =  async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_URL+'/api/member/delete/'+ props.obj._id)
                .then(response => {
                    window.location.reload() 
                })
                .catch(err => console.log(err))
                Swal.fire({
                    position: 'center',
                    title: 'Đã xóa thành công',
                    showConfirmButton: false,
                    timer: 1000
                  })
            }
          })
         
}
    return (
        <tr>
            <td></td>
            <td>{props.obj.idUser.fullname}</td>
            <td>{props.obj.idUser.address}</td>
            <td>{props.obj.idUser.phoneNumber}</td>
            <td>{props.obj.idUser.mail}</td>
            <td>{props.obj.idUser.idAccount.username}</td>
            <td width="100"><Image src={props.obj.idUser.avatar} style={{objectFit: 'cover',height:'50px',width:'50px'}}/></td>
            <td width="100"> 
            <Link to={"/edituser/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delDoctor}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRowUser;