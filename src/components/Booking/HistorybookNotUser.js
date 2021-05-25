import React, {useEffect,useState} from 'react'
import Header from '../Default/Header'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import {Container,Row, Col}  from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import {useHistory} from 'react-router-dom'

export default function Historybook(props) {
    const [nameKhoa,setNameKhoa] = useState('')
    const [day,setDay] = useState('')
    const [time,setTime] = useState ('')
    const [nameDoctor,setNameDoctor] = useState('')
    const [degree,setDegree] = useState('')
    const [customer,setCustomer] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [price,setPrice] = useState('')
    const [status,setStatus] = useState('')
    const history = useHistory()
    function returnHome (){
        history.push('/home')
    }
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/booking/get/' + props.match.params._id)
            .then((response) => {
                setNameKhoa(response.data.idFaculty.name)
                setDay(response.data.day)
                setTime(response.data.time)
                setNameDoctor(response.data.idDoctor.idUser.fullname)
                setDegree(response.data.idDoctor.degree)
                setCustomer(response.data.customer)
                setEmail(response.data.mail)
                setPhone(response.data.phoneNumber)
                setPrice(response.data.idOrder.price)
                if(response.data.idOrder.status===true){
                    setStatus('Đã thanh toán')
                }
                else{
                    setStatus('Chưa thanh toán')
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
   
    return (

            <div>
                <Header/>
                
                <div className='wapper1' >
                <div style={{marginLeft:'30px',paddingTop:'20px'}}>
                    <h2>Thông tin lịch hẹn</h2>
                    <div className='color__title'></div>
                 </div>
                    <Container style={{paddingTop:'50px',paddingLeft:'50px'}}>
                        <Row>
                            <Col> 
                                <div className = 'book__item khoa' style={{marginLeft:'0px'}}>
                                    
                                    <div className = 'item__nameKhoa'>
                                    <strong>Tên khách hàng : </strong>
                                        {customer}
                                    </div>
                                </div>
                                <br/>
                                <div className = 'book__item doctor'>
                                    <div className = 'item__degree'>
                                        <strong>Email:</strong>
                                    </div>
                                    <div className = 'item__fullname'>
                                        {email}
                                    </div> 
                                </div>
                                <br/>
                                <div className = 'book__item doctor'>
                                    <div className = 'item__degree'>
                                        <strong>Số điện thoại:</strong>
                                    </div>
                                    <div className = 'item__fullname'>
                                        {phone}
                                    </div> 
                                </div>
                                <br/>
                                <div className = 'book__item doctor'>
                                   <Button onClick={returnHome}>Quay về trang chủ</Button>
                                </div>
                               
                            </Col>
                            <Col>
                                <div className = 'book__item khoa' style={{marginLeft:'0px'}}>
                                    <div className = 'item__nameKhoa'>
                                    <strong>Chuyên khoa: </strong>
                                        {nameKhoa}
                                    </div>
                                </div>
                                <br/>
                                <div className = 'book__item doctor'>
                                    <div className = 'item__degree'>
                                    <strong>Bác sĩ:</strong> {degree}
                                    </div>
                                    <div className = 'item__fullname'>
                                    {nameDoctor}
                                    </div> 
                                </div>
                                <br/>
                                <div className = 'book__item timeb'>
                                    <div className = 'item__day'>
                                    <strong>Ngày:</strong> {day}
                                    </div>
                                    <div className = 'item__time'>
                                        <strong>Thời gian:</strong> {time}
                                    </div>
                                </div>
                                <br/>
                                <div className = 'book__item doctor'>
                                    <div className = 'item__degree'>
                                        <strong>Giá khám:</strong>
                                    </div>
                                    <div className = 'item__fullname'>
                                    <NumberFormat value = {price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/>
                                    </div> 
                                </div>
                                <br/>
                                <div className = 'book__item timeb'>
                                    <div className = 'item__day'>
                                        <strong>Trạng thái:</strong> {status}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Image style={{position: 'absolute',zIndex:'-1',marginTop:'-35%',opacity:'0.2',marginLeft:'200px'}}
                        src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/undraw_Booking_re_gw4j.png'/>
                </div>
            </div>
    )
}
