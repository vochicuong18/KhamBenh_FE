import React, {useState} from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'

function TableRow (props) {
    const [name] = useState(props.obj.name)
    const [description] = useState(props.obj.description)
    const [symptom] = useState(props.obj.symptom.join(', '))
    const [faculty] = useState(setFac)
    function setFac (){
        if (!props.obj.idFaculty) {
            return ('');
        } 
        else {
        return props.obj.idFaculty.name
        }
    }
    const delDoctor =  async () => {
        axios.delete('http://localhost:9000/api/diagnostic/delete/'+ props.obj._id)
            .then(response => {
                toast.success('Xóa thành công!')  
            })
            .catch(err => console.log(err))
            window.location.reload()
    }
    return (
        <tr>
            <td></td>
            <td>{name}</td>
            <td>{description}</td>
            <td>{symptom}</td>
            <td>{faculty}</td>
            <td>
            <Link to={"/editdiagnosis/"+ props.obj._id}>
                <FontAwesomeIcon icon ={faUserEdit} style={{fontSize:'20px'}} />
            </Link>

            <button className='btn__row' onClick = {delDoctor}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRow;