import React, {useEffect,useState} from 'react'
import Header from '../Default/Header'
import axios from 'axios'
import {Button} from 'react-bootstrap'
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
    const [checkPay,setCheckPay] = useState('')
    const history = useHistory()
    function returnHome (){
        history.push('/home')
    }
    const Payment  = value => event =>{
        const formData={
            idOrder: value,
        }
        axios.post(process.env.REACT_APP_API_URL+'/api/payment/create/',formData)
        .then((response) => {
            console.log(response.data);
            window.location.href = response.data.data
            // history.push()
        })
        .catch((err) => {
            console.log(err.response.data);
        })
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
                setCheckPay(response.data.idOrder.status)
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
    },[props.match.params._id])
    function ButtonDisable () {
        return(
            <Button disabled style = {{marginLeft:'20px'}}variant="" onClick={returnHome}>Thanh toán</Button> 
        );
    }
    function ButtonEnable () {
        return(
            <Button style = {{marginLeft:'20px'}}variant="outline-danger" onClick={returnHome}>Thanh toán</Button>
        );
    }
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
                                <div className = 'book__item doctor' style = {{display: 'flex'}}>
                                   <Button onClick={returnHome}> Trang chủ </Button>
                                   {checkPay ? <ButtonDisable/> :<ButtonEnable/> }
                                   
                                </div>
                                <div className = 'book__item doctor'>
                                   
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
                    
                </div>
            </div>
    )
}
