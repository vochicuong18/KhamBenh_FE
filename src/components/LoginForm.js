import React, {useState} from 'react'
import { Row, Col } from 'antd';
import {FormGroup, Form,Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom"
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify'
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import { useForm } from "react-hook-form";
import RegisterModal from '../components/Register/RegisterModal'
import {Link} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../yupGlobal'

function Login () {
    // const {handleSubmit} = useForm()

    // const [ggID,setGgID] = useState('')
    // const [avatar,setAvatar] = useState('')
    // const [fullname,setFullname] = useState('')
    // const [email,setEmail] = useState('')
    toast.configure({
        autoClose: 700,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })

    let history = useHistory();
      
    const responseGoogle = response =>{
        const formDataGG = {
            googleId:response.profileObj.googleId,
            fullname:response.profileObj.name,
            avatar:response.profileObj.imageUrl,
            mail:response.profileObj.email
        }
        console.log(formDataGG);
        axios.post(process.env.REACT_APP_API_URL+'/api/login/gg', formDataGG)
        .then(response => {
            console.log(response.data);
            // toast.success('Thêm thành công')
            localStorage.setItem('idUser',response.data._id)
            history.push("/home")
            toast.success('Đăng nhập thành công')
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
    }
   
    const login = (data) =>{
        console.log(data);
        axios.post(process.env.REACT_APP_API_URL+'/api/login/log',data)
        .then(response=>{
            if(response.data.admin){
                console.log(response.data.admin);
                history.push("/admin")
                toast.success('Đăng nhập thành công')
                return
            }
            if(response.data.idUser.idAccount.idRole._id === '608d70c9c7b4fa2708e30e6a'){
                localStorage.setItem('idUser',response.data._id)
                history.push("/home")
                toast.success('Đăng nhập thành công')
                return
            }
            if(response.data.idUser.idAccount.idRole._id === '608d10b88057022ea4f4c2c6'){
                localStorage.setItem('idUser',response.data._id)
                history.push("/admin-user")
                toast.success('Đăng nhập thành công')
                return
            }
        })
        .catch(err=>{
            toast.error(err.response.data.message)

        })
    }
    

    const schema = yup.object().shape({
        username: yup.string().required('*Vui lòng không để trống').username('*Username không có kí tự đặt biệt, phải từ 3 đến 16 kí tự'),
        password: yup.string().required('*Vui lòng không để trống'),
      })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    
    return (
        
        <div>
              <RegisterModal/>
            <div>
                <Image src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/1.png'
                    style={{position: 'absolute',width:'100%',height:'100vh',objectFit: 'cover'}}
                />
            </div>
            <div className="container">
                    <Row>   
                        <Col flex={4}>
                            <div className = "wapper__background">
                                <Image src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/123.png'
                                    style={{objectFit: 'cover'}}
                                />
                            </div>
                        </Col>
                        <Col flex={1}>
                            <div className="wapper__login">
                                <div className="form__login">                                   
                                    <Form onSubmit = {handleSubmit(login)}>
                                        <FormGroup>
                                            <Form.Label className="lable">Username:</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className = 'login__input'
                                                // defaultValue="test" {...register("example")}
                                                {...register('username', { required: true })}
                                            /> 
                                            {errors.username && <p className="error">{errors.username.message}</p>}

                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label className="lable">Password:</Form.Label>
                                            <Form.Control 
                                                className = 'login__input' 
                                                type="password"
                                                 {...register('password', { required: true })}
                                                />
                                            {errors.password && <p className="error">{errors.password.message}</p>}
                                        </FormGroup>
                                        <Button type="submit" className = 'btn__login' variant='primary' style = {{marginBottom:'20px'}}>
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
                                      
                                        <Link to={"/forgotpassword"}>
                                        <div  className="forgot">
                                            <p>Forgot Password?</p>
                                        </div>
                                        </Link>
                                        <div className="br"> </div>                                       
                                        <Button className = 'btn__login' variant='success' type = 'button' data-toggle="modal" data-target="#DangKi">
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
