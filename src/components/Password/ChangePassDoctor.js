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
    },[id])
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
                toast.error('X??c nh???n m???t kh???u kh??ng ????ng')
            )
             
        }else (toast.error('Kh??ng tr??ng kh???p m???t kh???u c??'))  
    }
    return (
        <div>
            <Form className='form__info forgotpass' onSubmit={ChangePass}>
                <Form.Group controlId="formBasicPassword">
                    <h3>?????t l???i m???t kh???u</h3>
                    <h6>Vui l??ng ??i???n th??ng tin m???i</h6>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>M???t kh???u hi???n t???i:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleCurrentPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>M???t kh???u m???i:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleNewPass}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Nh???p l???i m???t kh???u m???i:</Form.Label>
                    <Form.Control type="password" required className="login__input" style={{width:'440px'}} onChange={handleNewPassCheck}/>
                </Form.Group>
                <Button type="submit" variant="primary" style={{marginLeft:'350px'}}>
                    X??c nh???n
                </Button>
            </Form>
            </div>
    )
}
