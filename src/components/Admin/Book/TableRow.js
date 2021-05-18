import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';

function TableRow (props) {
    const [date] = useState(props.obj.day)
    const [time] = useState(props.obj.time)
    const [khoa] = useState(setFac)
    const [doctor] = useState(setDoc)
    const [member] = useState(props.obj.customer)
    const [status] = useState(setStatus)
    const [price] = useState(props.obj.idOrder.price)
    function setFac (){
        if (!props.obj.idFaculty) {
            return ('');
        } 
        else {
        return props.obj.idFaculty.name
        }
    }
    function setDoc (){
        if (!props.obj.idDoctor) {
            return ('');
        } 
        else {
            return props.obj.idDoctor.idUser.fullname
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
    const delBook =  async () => {
        axios.delete('http://localhost:9000/api/booking/delete/'+ props.obj._id)
            .then(response => {
                toast.success('Xóa thành công!')  
            })
            .catch(err => console.log(err))
            window.location.reload()
    }
    return (
        <tr style={{marginTop:'20px'}}>
            <td></td>
            <td>{member}</td>
            <td>{doctor}</td>           
            <td>{khoa}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td><NumberFormat value = {price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/></td>
            <td>{status}</td>
            <td>
                <button className='btn__row' onClick = {delBook}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRow;