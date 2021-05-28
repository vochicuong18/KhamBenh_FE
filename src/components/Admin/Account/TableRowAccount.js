import React,{useState} from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'

function TableRowUser (props) {
    const [name] = useState(checkName)
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    const delAcc =  async () => {
        axios.delete(process.env.REACT_APP_API_URL+'/api/member/delete/'+ props.obj._id)
        .then((response) => {
            console.log(props.obj._id);
           
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
            window.location.reload()
    }
    function checkName(){
        if(!props.obj.idRole){
            return ('')
        }
        else{
            return props.obj.idRole.name
        }
    }
    
    return (
        <tr>
            <td></td>
            <td>{props.obj.username}</td>
            <td>{props.obj.password}</td>
            <td>{name}</td>
             <td>
            <Link to={"/editaccount/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delAcc}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRowUser;