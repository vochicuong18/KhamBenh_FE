import React, { Component } from 'react'
import { Row, Col } from 'antd';
import {FormGroup, Form,Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
import Background from "../Video/bg.mp4"
export default class Login extends Component {

    login = event => {
        event.preventDefault();
        localStorage.setItem("tentui","CUONGNEHIHI111");
        console.log("a")
    }
    logout = event => {
        event.preventDefault();
        localStorage.removeItem("tentui");

    }

    render() {
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
                                                />                                               
                                            </FormGroup>
                                            <FormGroup>
                                                <Form.Label className="lable">Password:</Form.Label>
                                                <Form.Control 
                                                    className = 'login__input' 
                                                    type="password"/>
                                            </FormGroup>
                                            <Link to={"/home"}>
                                                <Button className = 'btn__login' variant='primary' type='submit'>
                                                    Sign in
                                                </Button>
                                            </Link>
                                            <div  className="forgot">
                                                <p>Forgot Password?</p>
                                            </div>
                                            <div className="br"> </div>                                       
                                            <Button onClick={this.login} className = 'btn__login' variant='success' type = 'button'>
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
}
