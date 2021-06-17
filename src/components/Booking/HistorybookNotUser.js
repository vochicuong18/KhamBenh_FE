import React, {useEffect,useState} from 'react'
import Header from '../Default/Header'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import {Container,Row, Col}  from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import {useHistory} from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import moment from 'moment'
import { toast } from 'react-toastify'
import 'moment/locale/vi'  
moment.locale('vi')
export default function Historybook(props) {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })  
    const [nameKhoa,setNameKhoa] = useState('')
    const [day,setDay] = useState('')
    const [time,setTime] = useState ('')
    const [nameDoctor,setNameDoctor] = useState('')
    const [customer,setCustomer] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [price,setPrice] = useState('')
    const [status,setStatus] = useState('')
    const [checkPay,setCheckPay] = useState('')
    const [idOrder, setId] = useState('')
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [avatarDoctor, setAvatarDoctor] = useState('')
    function returnHome (){
        history.push('/home')
    }
    function Payment (){
        const formData={
            idOrder: idOrder
        }
        axios.post(process.env.REACT_APP_API_URL+'/api/payment/create/',formData)
        .then((response) => {
            console.log(response.data);
            window.location.href = response.data.data
        })
        .catch((err) => {
            toast.info(err.response.data.message);
        })
    }
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/booking/get/' + props.match.params._id)
            .then((response) => {
                setId(response.data.idOrder._id)
                setNameKhoa(response.data.idFaculty.name)
                setDay(response.data.day)
                setTime(response.data.time)
                if(response.data.idDoctor){
                    setNameDoctor(response.data.idDoctor.idUser.fullname)
                    setAvatarDoctor(response.data.idDoctor.idUser.avatar)

                }else {
                    setNameDoctor("Chưa chọn")
                    setAvatarDoctor(response.data.idFaculty.logo)
                }
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
                setLoading(true)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[props.match.params._id])
    function ButtonDisable () {
        return(
            <Button disabled style = {{marginLeft:'20px'}}variant="" onClick={Payment}>Thanh toán</Button> 
        );
    }
    function ButtonEnable () {
        return(
            <Button style = {{marginLeft:'20px'}}variant="outline-danger" onClick={Payment}>Thanh toán</Button>
        );
    }
    return (

            <div>
                <Header/>
                <div>
                    <Image  src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/BrightVault.jpg'style = {{position:"absolute", zIndex:'-1', width:'100%',height:'100%', objectFit: 'cover'}} />
                </div>  
                <div className='' >
                <div style={{marginLeft:'30px',paddingTop:'20px'}}>
                    <h2>Thông tin lịch hẹn</h2>
                    <div className='color__title'></div>
                 </div>
               
                    <Container className='container__detail' >
                    {loading ?<Row>
                            <Col className='info__doctor'> 
                            <Image className="avatar__doctor" src={avatarDoctor} width="50%" height="250px" roundedCircle  style={{objectFit: 'cover'}}/>
                               <br/>
                                <div className = 'book__item doctor1'>
                                    <div className = 'item__degree'>
                                        <strong>Bác sĩ:</strong>
                                    </div>
                                    <div className = 'item__fullname'>
                                        {nameDoctor}
                                    </div> 
                                </div>
                                <div className = 'book__item khoa' style={{marginLeft:'0px'}}>
                                    <div className = 'item__nameKhoa'>
                                    <strong>Chuyên khoa: </strong>
                                        {nameKhoa}
                                    </div>
                                </div>
                                <br/>
                                <div className = 'book__item timeb'>
                                    <div className = 'item__day'>
                                        {moment({day}).format("ll")}
                                    </div>
                                    <div className = 'item__time'>
                                       {time}
                                    </div>
                                </div>
                            </Col>
                            <Col > 
                                <div>
                                   <h3>Thông tin khách hàng</h3> 
                                </div>
                                <div className="info__user">
                                    <div className = 'book__item' style={{marginLeft:'0px'}}>
                                        <div className = 'item__nameKhoa'>
                                        <strong>Tên khách hàng: </strong>
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
                                        <div className = 'item__degree'>
                                            <strong>Giá khám:</strong>
                                        </div>
                                        <div className = 'item__fullname'>
                                            <NumberFormat value = {price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/>
                                        </div> 
                                    </div>
                                    <br/>
                                    <div className = 'book__item timeb'>
                                        <div className = ''>
                                            <strong>Trạng thái:</strong> {status}
                                    
                                        </div>
                                    </div>
                                    
                                </div>
                                <br/>
                                    <div className = 'book__item doctor' style = {{display: 'flex'}}>
                                        <Button onClick={returnHome}> Trang chủ </Button>
                                        {checkPay ? <ButtonDisable/> :<ButtonEnable/> }
                                    </div>
                            </Col>
                        </Row> :<div className="spinner-3"></div>}
                        
                    </Container>
                    
                </div>
            </div>
    )
}
