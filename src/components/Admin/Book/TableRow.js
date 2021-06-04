import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faCheck,faTimes,faBan} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
function TableRow (props) {
    const Swal = require('sweetalert2')
    const [date] = useState(props.obj.day)
    const [time] = useState(props.obj.time)
    const [khoa] = useState(setFac)
    const [doctor] = useState(setDoc)
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
    function checkTime1(){
        if(props.obj.status === true){
            return ('Active')
        }else{
            return ('Cancel')
        }
    }
    const delBook =  async () => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            text: "Bạn sẽ không thể hoàn tác lại điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete(process.env.REACT_APP_API_URL+'/api/booking/delete/'+ props.obj._id)
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
    const formData={

    }
    const ChangeStatus = async () => {
        Swal.fire({
            title: 'Thay đổi trạng thái lịch?',
            text: "Lịch khám sẽ hủy sao khi bạn làm điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(process.env.REACT_APP_API_URL+'/api/booking/cancel/'+ props.obj._id,formData)
                .then(response => {
                    window.location.reload()
                })
        
                .catch((err) => {
                    toast.error(err.response.data.message)
                })
            Swal.fire({
                position: 'center',
                title: 'Hủy lịch thành công',
                showConfirmButton: false,
                timer: 1000
              })
            }
          })
        
        
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
            <td>{checkTime}</td>
            <td>
                {/* <Link to={"/editbook/"+ props.obj._id}>
                    <FontAwesomeIcon icon ={faEdit} style={{fontSize:'20px'}} />
                </Link> */}
                <button className='btn__row' onClick = {ChangeStatus}><FontAwesomeIcon icon ={faBan} style={{fontSize:'20px',marginLeft:'5px'}}/></button> 
                <button className='btn__row' onClick = {delBook}><FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/></button> 
            </td>
            
        </tr>       
    );
}

export default TableRow;