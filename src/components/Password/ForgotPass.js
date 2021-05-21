import React,{useState} from 'react'
import Header from '../Default/Header'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'

export default function ForgotPass() {
    const history = useHistory();
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })  
    const [idAccount,setIdAccount] = useState('')
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [showHome,setShowHome] = useState(false)
    const [show,setShow] = useState(true)
    const [code, setCode] = useState('')
    const [inputCode,setInputCode] = useState('')
    const [showNew,setShowNew] = useState(false)
    const [newPass,showNewPass] = useState('')
    const [newPassCheck,showNewPass1Check] = useState('')
    function handleUserName(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handleEmail(e){
        e.preventDefault()
        setEmail(e.target.value)
    }
    function handleCode (e){
        e.preventDefault()
        setInputCode(e.target.value)
    }
    function handleNewPass (e){
        e.preventDefault()
        showNewPass(e.target.value)
    }
    function handleNewPassCheck (e){
        e.preventDefault()
        showNewPass1Check(e.target.value)
    }
    const Verify =() =>{
        const formData = {
            username:username,
            mail:email
        }
        console.log(formData);
        axios.post(process.env.REACT_APP_API_URL+'/api/login/forgotpassword',formData)
        .then(response =>{
            console.log(response.data);
            setIdAccount(response.data.idAccount)
            toast.success(response.data.messege)
            if(response.data){
                setShowHome(true)
                setShow(false)
                setCode(response.data.otp)
            }
        })
        .catch(err => toast.error(err.response.data.message));
    }   
    function checkOTP(){
        if(code.toString() === inputCode.toString()){
            setShowHome(false)
            setShowNew(true)
        }else{
            toast.error('Mã xác sự không đúng')
        }
    }  
    function NewPass(){
        if(newPass === newPassCheck){
            const formData = {
                newpassword:newPass
            }
            console.log(formData);
            axios.put(process.env.REACT_APP_API_URL+'/api/login/changepasswordforgot/'+ idAccount,formData)
            .then(response =>{
                toast.success(response.data)
                history.push("/")
            })
            .catch(err => toast.error(err.response.data.message));
        }else{
            toast.error('Mật khẩu không trùng khớp')
        }
    }  
    return (
        <div>
            <Header/>
            <div style={{display: show ? 'block' : 'none' }}>
                <Form className='form__info forgotpass'>
                    <Form.Group controlId="formBasicPassword">
                        <h3>Tìm mật khẩu</h3>
                        <h6>Vui lòng nhập Username và Email để tìm lại mật khẩu của bạn</h6>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" className="login__input" style={{width:'440px'}} onChange={handleUserName}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" className="login__input" style={{width:'440px'}} defaultValue='sugiadianguc2030@gmail.com' onChange={handleEmail}/>
                    </Form.Group>
                    <Button variant="primary" onClick = {Verify} style={{marginLeft:'350px'}}>
                        Xác nhận
                    </Button>
                </Form>
            </div>
            <div style={{display: showHome ? 'block' : 'none' }}>
                <Form className='form__info forgotpass'>
                    <Form.Group controlId="formBasicPassword">
                        <h3>Tìm mật khẩu</h3>
                        <h6>Hãy nhập mã xác thực được gửi trong Email của bạn</h6>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Mã xác thực:</Form.Label>
                        <Form.Control type="email" className="login__input" style={{width:'440px'}} onChange={handleCode}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick = {checkOTP} style={{marginLeft:'350px'}}>
                        Xác nhận
                    </Button>
                </Form>
            </div>
            <div style={{display: showNew ? 'block' : 'none' }}>
                <Form className='form__info forgotpass'>
                    <Form.Group controlId="formBasicPassword">
                        <h3>Tìm mật khẩu</h3>
                        <h6>Vui lòng điền thông tin mới</h6>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control type="password" className="login__input" style={{width:'440px'}} onChange={handleNewPass}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                        <Form.Control type="password" className="login__input" style={{width:'440px'}} onChange={handleNewPassCheck}/>
                    </Form.Group>
                    <Button variant="primary" onClick = {NewPass} style={{marginLeft:'350px'}}>
                        Xác nhận
                    </Button>
                </Form>
            </div>
        </div>
    )
}
