import React, {useState} from 'react'
import { Row, Col } from 'antd';
import {FormGroup, Form,Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom"
import Background from "../Video/bg.mp4"
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify'
import axios from 'axios';
function Login () {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    const[username, setUserName]= useState('')
    const[password, setPassword] = useState('')
    let history = useHistory();
    const responseGoogle = response =>{
        console.log(response);
        console.log(response.profileObj.googleId);
        console.log(response.profileObj.email);
        console.log(response.profileObj.name);
        console.log(response.profileObj.imageUrl);
        // history.push("/home");
        // toast.success('Đăng nhập thành công')
    }
    const formData = {
        username:username,
        password:password
    }
    const login = async () => {
        console.log(formData);
        await axios.post('http://localhost:9000/api/login/log',formData)
        .then(response=>{
            console.log(response.data.idUser._id);
            if(response.data.admin){
                history.push("/admin")
                console.log(response.data.admin);
                toast.success('Đăng nhập thành công')
            }
            if(response.data.idUser.idAccount.idRole._id === '608d70c9c7b4fa2708e30e6a'){
                localStorage.setItem('idUser',response.data._id)
                history.push("/home")
                toast.success('Đăng nhập thành công')
            }
            if(response.data.idUser.idAccount.idRole._id === '608d10b88057022ea4f4c2c6'){
                localStorage.setItem('idUser',response.data._id)
                history.push("/admin-user")
                toast.success('Đăng nhập thành công')
            }
           
        })
        .catch(err=>{
            toast.error(err.response.data.message)

        })
    }
    function handleUserName(e){
        e.preventDefault();
        setUserName(e.target.value)
    }   
    function handlePassword(e){
        e.preventDefault();
        setPassword(e.target.value)
    }

    // const loginMembers {

    // }


    return (
        <div>
            <div>
                <video autoPlay loop muted style={{position: 'absolute',width:'100%',height:'100vh',objectFit: 'cover'}}>
                    <source src={Background}></source>                       
                </video>
            </div>
            <div className="container">
                    <Row>   
                        <Col flex={4}>
                        </Col>
                        <Col flex={1}>
                            <div className="wapper__login">
                                <div className="form__login">                                   
                                    <Form>
                                        <FormGroup>
                                            <Form.Label className="lable">Username:</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className = 'login__input'
                                                onChange={handleUserName}
                                            />                                               
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label className="lable">Password:</Form.Label>
                                            <Form.Control 
                                                className = 'login__input' 
                                                type="password"
                                                onChange={handlePassword}/>
                                        </FormGroup>
                                        
                                            <Button onClick={login} className = 'btn__login' variant='primary' style = {{marginBottom:'20px'}}>
                                                Sign in
                                            </Button>
                                
                                        <br/>
                                        
                                        <div className="login__google">
                                            <GoogleLogin 
                                                clientId="356717259951-ejjrh6jq8sdsihp24u46cvramt37mes2.apps.googleusercontent.com"
                                                buttonText="Sign in with Google"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                            >
                                            </GoogleLogin>
                                        </div>
                                        
                                        <div  className="forgot">
                                            <p>Forgot Password?</p>
                                        </div>
                                        <div className="br"> </div>                                       
                                        <Button className = 'btn__login' variant='success' type = 'button'>
                                            Đăng kí
                                        </Button>

                                        
                                    </Form>
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>
            </div>
        </div>
    )
}
export default Login
