import React, { useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Radio,RadioGroup} from 'react-radio-group'
import { Form,Button} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import {useHistory} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../yupGlobal'
function RegisterModal() {
    const [gender, setGender] = useState('Nam')
    let history = useHistory();
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    const handleGender =(value)=>{
        setGender(value)
        console.log(value);
    }  
    const addNewMember = async (data) =>{
        const formData={
            username:data.username,
            password:data.password,
            mail:data.email,
            fullname :data.fullName,
            phone:data.phone,
            address:data.address,
            gender:gender
        }
        console.log(formData);
        axios.post(process.env.REACT_APP_API_URL+'/api/account/create',formData)
        .then(response => {
            console.log(response.data);
            localStorage.setItem('idUser',response.data._id)
            history.push("/home")
            window.location.reload()
        })
        .catch((err) => {
            console.log(err.response.data.message);
            toast.error(err.response.data.message)
        })
     }
     const schema = yup.object().shape({
        username: yup.string().required('*Vui lòng không để trống').username('*Username không có kí tự đặt biệt, phải từ 3 đến 16 kí tự'),
        password: yup.string().required('*Vui lòng không để trống'),
        phoneNumber: yup.string().phone('*Sai địng dạng số điện thoại'),
        fullName :yup.string().required('*Vui lòng không để trống').fullName('*Sai định dạng tên'),
        address:yup.string().required('*Vui lòng không để trống').address('*Sai định dạng địa chỉ'),
        email:yup.string().required('*Vui lòng không để trống').email('*Sai định dạng email')
        
      })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    return (
        <Form onSubmit={handleSubmit(addNewMember)} >
            <div className="modal fade" id="DangKi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Đăng kí ngay</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                   <div>
                   <div className="modal-body">                           
                            <div className="form-group ">
                            <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Tài khoản</h5>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="">Username:</label>
                                            <input type="text" name="username" className="form-control" placeholder="" aria-describedby="helpId"
                                          {...register('username', { required: true })}/>
                                        {errors.username && <p className="error">{errors.username.message}</p>}
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Mật khẩu:</label>
                                            <input type="text" name='password' className="form-control" placeholder="" aria-describedby="helpId" 
                                         {...register('password', { required: true })} />
                                         {errors.password && <p className="error">{errors.password.message}</p>}
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
                                            <input type="text" name='fullName' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                              {...register('fullName', { required: true })} />
                                            {errors.fullName && <p className="error">{errors.fullName.message}</p>}   
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Giới tính:</label>
                                            <RadioGroup name="gender" style={{display: 'flex',justifyContent: 'space-around'}} selectedValue={gender} onChange={handleGender}>
                                                <div className="radio-button-background">
                                                    <Radio value="Nam" className="radio-button" />  Nam
                                                </div>
                                                <div className="radio-button-background">
                                                    <Radio value="Nữ" className="radio-button" />  Nữ
                                                </div>
                                                <div className="radio-button-background">
                                                    <Radio value="Khác" className="radio-button"/>  Khác
                                                </div>
                                            </RadioGroup>
                                        </div>
                                       
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text" name='address' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                  {...register('address', { required: true })} />
                                    {errors.address && <p className="error">{errors.address.message}</p>}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" name='phoneNumber' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                           {...register('phone', { required: true })} />
                                          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" name='email' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                         {...register('email', { required: true })} />
                                          {errors.email && <p className="error">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</Button>
                            <Button type="submit" className="btn btn-primary">Lưu</Button>
                        </div>
                  
                   </div>
                </div>
                </div>
            </div>
            </Form>  
       
    )
}
export default RegisterModal