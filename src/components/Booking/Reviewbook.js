import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"
import Image from 'react-bootstrap/Image'
export default function Reviewbook() {
    const [idDoctor, setIdDoctor] = useState(localStorage.getItem('bookDoctor'))
    const [idFaculty, setIdFaculty] = useState(localStorage.getItem('bookFac'))
    const [idMember, setIdMember] = useState(localStorage.getItem('idUser'))
    const [phone,setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email,setEmail] = useState('')
    const [nameUser, setNameUser] = useState('')
    const [nameDoctor, setNameDoctor] = useState('')
    const [bookDate, setBookDate] = useState(localStorage.getItem('bookDate'))
    const [bookTime, setBookTime] = useState(localStorage.getItem('bookTime'))
    const [nameFaculty,setNameFaculty] = useState('')
    useEffect(() => {
        async function getAPI(){
             await axios.get('http://localhost:9000/api/member/get/'+localStorage.getItem('idUser'))
            .then((response) => {
                // console.log(response.data);
                setNameUser(response.data.idUser.fullname)
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
    useEffect(() => {
        async function getAPI(){
             await axios.get('http://localhost:9000/api/doctor/get/'+localStorage.getItem('bookDoctor'))
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
             await axios.get('http://localhost:9000/api/faculty/get/'+ localStorage.getItem('bookFac'))
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
    const formData =   {
        idFaculty: idFaculty,
        idDoctor:idDoctor,
        idMember: idMember,
        phoneNumber: phone,
        mail: email,
        day:bookDate,
        time:bookTime,
    }
    const addBook = async () => {
        console.log(formData);
        // await axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
        axios.post('http://localhost:9000/api/booking/create', formData)
        .then(response =>{
            console.log('thành công');
            console.log(response.data.message);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='wapper__faculty' style= {{padding: '20px 20px'}}>
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
                                <Form.Control type="text" defaultValue = {nameUser}/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group>
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control type="text" defaultValue = {phone} />
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
                                <Form.Control type="text" defaultValue = {email} />
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
                <Button variant="primary" onClick = {addBook}>
                    Lưu
                </Button>
            </Form>
        </div>
    )
}
