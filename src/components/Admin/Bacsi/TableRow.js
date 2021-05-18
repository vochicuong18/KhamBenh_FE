import React, {useState} from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'

function TableRow (props) {
    const [fullName] = useState(props.obj.idUser.fullname)
    const [khoa] = useState(getKhoa)
    const [address] = useState(props.obj.idUser.address)
    const [degree] = useState(props.obj.degree)
    const [avatar] = useState(props.obj.idUser.avatar)
    function getKhoa(){
        if(!props.obj.idFaculty){
            return('')
        }
        else{
            return(props.obj.idFaculty.name)
        }
    }
    const delDoctor =  async () => {
        axios.delete('http://localhost:9000/api/doctor/delete/'+ props.obj._id)
            .then(response => {
                toast.success('Xóa thành công!')  
            })
            .catch(err => console.log(err))
            window.location.reload()
    }
    return (
        <tr>
            <td></td>
            <td>{fullName}</td>
            <td>{khoa}</td>
            <td>{address}</td>
            <td>{degree}</td>
            <td width="200"><Image src={avatar} width="25%" height="50px" style = {{objectFit:'cover'}}/></td>
            <td>
            <Link to={"/edit/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delDoctor}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRow;