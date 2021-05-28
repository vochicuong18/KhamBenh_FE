import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
function TableRow (props) {
    const [date] = useState(props.obj.day)
    const [time] = useState(props.obj.time)
    const [khoa] = useState(setFac)
    const [member] = useState(props.obj.customer)
    const [status] = useState(setStatus)
    const [price] = useState(props.obj.idOrder.price)
    const [checkTime] = useState(checkTime1)
    function setFac (){
        if (!props.obj.idFaculty) {
            return ('');
        } 
        else {
        return props.obj.idFaculty.name
        }
    }
    function setStatus (){
        if (props.obj.idOrder.status === true) {
            return <FontAwesomeIcon icon ={faCheck} style={{fontSize:'20px', color:'green',marginLeft:'20px'}}/>
        } 
        else {
            return <FontAwesomeIcon icon ={faTimes} style={{fontSize:'20px', color:'red',marginLeft:'20px'}}/>
        }
    }
    function checkTime1(){
        if(props.obj.status === true){
            return ('Active')
        }else{
            return ('Cancel')
        }
    }
    return (
        <tr style={{marginTop:'20px'}}>
            <td></td>
            <td>{member}</td>
            <td>{khoa}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td><NumberFormat value = {price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/></td>
            <td>{status}</td>
            <td>{checkTime}</td>

            
        </tr>       
    );
}

export default TableRow;