import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserEdit } from '@fortawesome/free-solid-svg-icons'

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

            </td>
            
        </tr>       
    );
}

export default TableRow;