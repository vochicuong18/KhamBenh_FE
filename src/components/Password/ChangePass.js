import React,{useState} from 'react'
import Header from '../Default/Header'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ChangePass() {
    const history = useHistory();
    toast.configure({
        autoClose: 1500,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    const [inputCurrent,setInputCurrent]=useState('')
    const [newPass,showNewPass] = useState('')
    const [newPassCheck,showNewPassCheck] = useState('')
    function handleNewPass (e){
        e.preventDefault()
        showNewPass(e.target.value)
    }
    function handleNewPassCheck (e){
        e.preventDefault()
        showNewPassCheck(e.target.value)
    }
    function handleCurrentPass (e){
        e.preventDefault()
        setInputCurrent(e.target.value)
    }
    const formData={
        password:inputCurrent,
        newpassword:newPass
    }
    function ChangePass(){
        console.log(formData);
        if(newPass === newPassCheck){
            axios.put(process.env.REACT_APP_API_URL+'/api/login/changepassword/'+localStorage.getItem('idUser'),formData)
            .then(response =>{
                console.log(response.data);
                toast.success(response.data.message);
                history.push("/home")
            })
            .catch(err => toast.error(err.response.data.message));
        }
        else(
            toast.error('Xác nhận mật khẩu không đúng')
        )   
    }
  
    return (
        <div>
            <Header/>
            <Form className='form__info forgotpass'>
                <Form.Group controlId="formBasicPassword">
                    <h3>Đặt lại mật khẩu</h3>
                    <h6>Vui lòng điền thông tin mới</h6>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mật khẩu hiện tại:</Form.Label>
                    <Form.Control type="password" className="login__input" style={{width:'440px'}} onChange={handleCurrentPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mật khẩu mới:</Form.Label>
                    <Form.Control type="password" className="login__input" style={{width:'440px'}} onChange={handleNewPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Nhập lại mật khẩu mới:</Form.Label>
                    <Form.Control type="password" className="login__input" style={{width:'440px'}} onChange={handleNewPassCheck}/>
                </Form.Group>
                <Button variant="primary" onClick={ChangePass} style={{marginLeft:'350px'}}>
                    Xác nhận
                </Button>
            </Form>
            </div>
    )
}
