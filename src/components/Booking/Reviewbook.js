import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'moment/locale/es'
moment.locale('vi')
moment().format("l")
export default function Reviewbook() {
    let history = useHistory();
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
    const [bookDate,setBookDate] = useState(localStorage.getItem('bookDate'))
    const [bookTime,setBookTime] = useState(localStorage.getItem('bookTime'))
    const [nameFaculty,setNameFaculty] = useState('')
    const [idBooking, setIdBooking] = useState('')

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
    function handleDate(e){
        e.preventDefault();
        setBookDate(e.target.value)
    }
    function handleTime(e){
        e.preventDefault();
        setBookTime(e.target.value)
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
    const addBook = async (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'/api/booking/create', formData)
        .then(response =>{
            console.log(response.data.idOrder.idBooking);
            const idBooking = response.data.idOrder.idBooking
            Swal.fire({
                title: 'Đặt khám thành công',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Xác nhận'
              }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/history-book-details/'+idBooking)
                    console.log(idBooking);
                }
              })
            
        })
        .catch((err) => {
            toast.error(err.response.data.message)
            console.log(err.response.data)
        })
    }
    const Payment = async () => {
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

	
	function getDate (date){
		setBookDate(moment(date).format("l"));
	}	

    return (
        <div className='wapper__faculty' style= {{padding: '20px 200px'}}>
            <div className='header__booking' style={{display: 'flex' , marginLeft:'70px'}} >
				<Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg' alt = 'iconchonkhoa'/> 
				<h3 style={{marginLeft:'15px',marginTop:'18px'}}>Thông tin hóa đơn</h3>
			</div>
            <Form onSubmit={addBook} className ='form__review'>
                <div className='form__info'>
                    <div className="title__info first__title">
                        <h5>Thông tin bệnh nhân</h5>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Họ tên:</Form.Label>
                                <Form.Control type="text" required defaultValue = {customer} onChange = {handleName} pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control type="text" defaultValue = {phone}  onChange = {handlePhone} pattern="^\+?(\d.*){3,}$"/>
                            </Form.Group>   
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Đỉa chỉ:</Form.Label>
                                <Form.Control type="text" defaultValue = {address} pattern="^(?!^\d+$)^.{5,}$" />
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" required defaultValue = {email}  onChange = {handleMail}/>
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
                                <Form.Control disabled type="text" defaultValue = {nameDoctor}/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Khoa:</Form.Label>
                                <Form.Control disabled type="text" defaultValue = {nameFaculty} />
                            </Form.Group>   
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Ngày: </Form.Label>
                                <br/> 
                                <DatePicker className = 'form-control' style="width: 390px;"
                                    value={bookDate}
                                    defaultValue={new Date()}
                                    placeholderText={localStorage.getItem('bookDate')}
                                    onChange={getDate}
                                    minDate={new Date()}
                                />
                                {/* <Form.Control required type="text" pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$" defaultValue = {bookDate} onChange={handleDate} /> */}
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Giờ:</Form.Label>
                                <Form.Control as="select" onChange={handleTime}>
                                    <option selected='selected'>{localStorage.getItem('bookTime')}</option>
                                    <option>Chọn giờ</option>
                                    <option>8:00</option>
                                    <option>9:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>13:00</option>
                                    <option>14:00</option>
                                    <option>15:00</option>
                                    <option>16:00</option>
                                </Form.Control>
                            </Form.Group>   
                        </div>
                    </div>
                </div>
                <div className='button__bill'>
                    <Button variant="primary"
                        type='submit'
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
