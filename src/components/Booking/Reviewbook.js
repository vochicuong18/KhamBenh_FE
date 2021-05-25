import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { toast } from 'react-toastify'

export default function Reviewbook() {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })  
    const Swal = require('sweetalert2')
    const [idDoctor] = useState(localStorage.getItem('bookDoctor'))
    const [idFaculty] = useState(localStorage.getItem('bookFac'))
    const [idMember] = useState(localStorage.getItem('idUser'))
    const [phone,setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email,setEmail] = useState('')
    const [customer,setCustomer] = useState('')
    const [nameDoctor, setNameDoctor] = useState('')
    const [bookDate] = useState(localStorage.getItem('bookDate'))
    const [bookTime] = useState(localStorage.getItem('bookTime'))
    const [nameFaculty,setNameFaculty] = useState('')
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/member/get/'+localStorage.getItem('idUser'))
            .then((response) => {
                // console.log(response.data);
                setCustomer(response.data.idUser.fullname)
                setPhone(response.data.idUser.phoneNumber)
                setAddress(response.data.idUser.address)
                setEmail(response.data.idUser.mail)
                return response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    function handleName(e){
        e.preventDefault();
        setCustomer(e.target.value)
    }
    function handlePhone(e){
        e.preventDefault();
        setPhone(e.target.value)
    }
    function handleMail(e){
        e.preventDefault();
        setEmail(e.target.value)
    }
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/'+localStorage.getItem('bookDoctor'))
            .then((response) => {
                console.log(response.data.idUser.fullname);
                setNameDoctor(response.data.idUser.fullname)
                return response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/faculty/get/'+ localStorage.getItem('bookFac'))
            .then((response) => {
                // console.log(response.data.name);
                setNameFaculty(response.data.name)
                return response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    const formData =  {
        customer:customer,
        idFaculty: idFaculty,
        idDoctor:idDoctor,
        idMember: idMember,
        phoneNumber: phone,
        mail: email,
        day:bookDate,
        time:bookTime,
    }
   
    const addBook = async () => {
        // await axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
        axios.post(process.env.REACT_APP_API_URL+'/api/booking/create', formData)
        .then(response =>{
            console.log(response.data);
            Swal.fire(
                'Đặt khám thành công',
                ' ',
                'success'
            )
        })
        .catch((err) => {
            toast.error(err.response.data.message)
            console.log(err.response.data)
        })
    }
    const Payment = async () => {
        // console.log(formData);
        // await axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
        await axios.post(process.env.REACT_APP_API_URL+'/api/booking/create', formData)
        .then(response =>{
            console.log('thành công');
            console.log(response.data);
            const formDataPayment={
                idOrder: response.data.idOrder._id,
                amount: response.data.idOrder.price,
                orderDescription: "Thanh toan lich kham LCHEALTH",
                language: "vn"
            }
            axios.post(process.env.REACT_APP_API_URL+'/api/payment/create',formDataPayment)
            .then((response) => {
                console.log(response.data);
                window.location.href = response.data.data

                // history.push()
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            console.log(response.data.idOrder._id)
            Swal.fire(
                'Đặt khám thành công',
                ' ',
                'success'
            )
            
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })
       
    }
    return (
        <div className='wapper__faculty' style= {{padding: '20px 200px'}}>
            <div style={{display: 'flex' , marginLeft:'70px'}} >
				<Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg' alt = 'iconchonkhoa'/> 
				<h3 style={{marginLeft:'15px',marginTop:'18px'}}>Thông tin hóa đơn</h3>
			</div>
            <Form>
                <div className='form__info'>
                    <div className="title__info first__title">
                        <h5>Thông tin bệnh nhân</h5>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Họ tên:</Form.Label>
                                <Form.Control type="text" defaultValue = {customer} onChange = {handleName}/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control type="text" defaultValue = {phone}  onChange = {handlePhone}/>
                            </Form.Group>   
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Đỉa chỉ:</Form.Label>
                                <Form.Control type="text" defaultValue = {address} />
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" defaultValue = {email}  onChange = {handleMail}/>
                            </Form.Group>   
                        </div>
                    </div>
                </div>
                <div className='form__info'>
                    <div className="title__info first__title">
                        <h5>Thông tin lịch khám</h5>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Bác sĩ:</Form.Label>
                                <Form.Control type="text" defaultValue = {nameDoctor}/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Khoa:</Form.Label>
                                <Form.Control type="text" defaultValue = {nameFaculty} />
                            </Form.Group>   
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Ngày: </Form.Label>
                                <Form.Control type="text" defaultValue = {bookDate} />
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Giờ:</Form.Label>
                                <Form.Control type="text" defaultValue = {bookTime} />
                            </Form.Group>   
                        </div>
                    </div>
                </div>
                <div className='button__bill'>
                    <Button variant="primary"
                        onClick = {addBook}
                        style = {{marginRight:'10px'}}>
                        Đặt khám
                    </Button>
                    <Button variant="outline-danger" onClick = {Payment}>
                        Thanh toán ngay
                    </Button>
                </div>
              
            </Form>
        </div>
    )
}
