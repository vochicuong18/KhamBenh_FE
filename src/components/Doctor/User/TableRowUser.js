import React from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'react-bootstrap/Image'

function TableRowUser (props) {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
     
    return (
        <tr>
            <td></td>
            <td>{props.obj.idUser.fullname}</td>
            <td>{props.obj.idUser.address}</td>
            <td>{props.obj.idUser.phoneNumber}</td>
            <td>{props.obj.idUser.mail}</td>
            <td>{props.obj.idUser.idAccount.username}</td>
            <td width="200"><Image src={props.obj.idUser.avatar} style={{objectFit: 'cover',height:'50px',width:'50px'}}/></td>
        </tr>       
    );
}

export default TableRowUser;