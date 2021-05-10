import React, {useState} from 'react'
import { Row, Col } from 'antd';
import {FormGroup, Form,Button } from 'react-bootstrap';
import {Link,useHistory} from "react-router-dom"
import Background from "../Video/bg.mp4"
import GoogleLogin from 'react-google-login';
import axios from 'axios';
function Login () {
    const[username, setUserName]= useState('')
    const[password, setPassword] = useState('')
    let history = useHistory();
    const responseGoogle = response =>{
        history.push("/home");

        console.log(response);
    }
    const formData = {
        username:username,
        password:password
    }
    const login = async () => {
        console.log(formData);
        await axios.post('http://10.200.0.160:9000/api/login/log',formData)
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err.response.data);
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
                                        
                                            <Button className = 'btn__login' variant='primary' onClick={login} style = {{marginBottom:'20px'}}>
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
