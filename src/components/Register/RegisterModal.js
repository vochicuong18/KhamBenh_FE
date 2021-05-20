import React, { useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Radio, RadioGroup} from 'react-radio-group'
import 'react-toastify/dist/ReactToastify.css'
import {useHistory} from "react-router-dom"
export default function RegisterModal() {
    let history = useHistory();
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    const [fullname, setFullName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [mail, setMail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [gender,setGender] = useState('')
    function handleName(e){
        e.preventDefault()
        setFullName(e.target.value)
    }
    function handleAddress(e){
        e.preventDefault()
        setAddress(e.target.value)
    }
    function handlePhone(e){
        e.preventDefault()
        setPhoneNumber(e.target.value)
    }
    function handleMail(e){
        e.preventDefault()
        setMail(e.target.value)
    }
    
    function handleUserName(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handlePassword(e){
        e.preventDefault()
        setPassword(e.target.value)
    }
    function handleGener(e){
        setGender(e);
    }
    const formData = {
        fullname:fullname,
        gender:gender,
        address:address,
        phoneNumber:phoneNumber,
        mail:mail,
        username:username,
        password:password,
    }
    const addNewMember = async () =>{
        console.log(formData);
        axios.post('http://localhost:9000/api/account/create', formData)
        .then(response => {
            console.log(response.data);
            localStorage.setItem('idUser',response.data._id)
            history.push("/home")
            window.location.reload()
        })
        .catch((err) => {
            // toast.error(err.response.data.message)
        })
     }
    return (
        <div className="modal fade" id="DangKi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Đăng kí ngay</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">                           
                            <div className="form-group ">
                            <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Tài khoản</h5>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="">Username:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                         onChange={handleUserName} />
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Mật khẩu:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                        onChange={handlePassword}   />
                                        </div>
                                    </div>              
                                </div>
                                <div className='form__info'>
                                    <div className="title__info first__title">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            onChange = {handleName} />   
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Giới tính:</label>
                                            <RadioGroup name="gender" style={{display: 'flex',justifyContent: 'space-around'}}selectedValue={gender} onChange={handleGener}>
                                                <div className="radio-button-background">
                                                    <Radio value="Nam" className="radio-button" />  Nam
                                                </div>
                                                <div className="radio-button-background">
                                                    <Radio value="Nữ" className="radio-button" />  Nữ
                                                </div>
                                                <div className="radio-button-background">
                                                    <Radio value="Khác" className="radio-button" />  Khác
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    onChange={handleAddress} />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                          onChange={handlePhone}/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                          onChange = {handleMail} />
                                        </div>
                                    </div>
                                </div>
                                
                                
                                     
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" onClick={addNewMember} className="btn btn-primary">Lưu</button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
    )
}
