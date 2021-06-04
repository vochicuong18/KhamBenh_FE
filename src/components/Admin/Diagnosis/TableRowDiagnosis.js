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
                axios.delete(process.env.REACT_APP_API_URL+'/api/diagnostic/delete/'+ props.obj._id)
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