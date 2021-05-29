import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ChangePass() {
    const [idAccount, setIdAccount] = useState('')
    const [oldPass,setOldPass] = useState('')
    const id = localStorage.getItem('idUser')
    const history = useHistory();
    toast.configure({
        autoClose: 1500,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/' + id)
            .then((response) => {
                console.log(response.data)
                setIdAccount(response.data.idUser.idAccount._id)
                setOldPass(response.data.idUser.idAccount.password)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
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

    function ChangePass (e){
        e.preventDefault();
        if(inputCurrent===oldPass){
            if(newPass === newPassCheck){
                axios.put(process.env.REACT_APP_API_URL+'/api/login/changepasswordforgot/'+ idAccount,formData)
                .then(response =>{
                    console.log(response.data);
                    history.push("/doctor")
                    toast.success(response.data.message);
                })
                .catch(err => toast.error(err.response.data.message));
            }
            else(
                toast.error('Xác nhận mật khẩu không đúng')
            )
             
        }else (toast.error('Không trùng khớp mật khẩu cũ'))  
    }
    return (
        <div>
            <Form className='form__info forgotpass' onSubmit={ChangePass}>
                <Form.Group controlId="formBasicPassword">
                    <h3>Đặt lại mật khẩu</h3>
                    <h6>Vui lòng điền thông tin mới</h6>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mật khẩu hiện tại:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleCurrentPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mật khẩu mới:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleNewPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Nhập lại mật khẩu mới:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleNewPassCheck}/>
                </Form.Group>
                <Button type="submit" variant="primary" style={{marginLeft:'350px'}}>
                    Xác nhận
                </Button>
            </Form>
            </div>
    )
}
