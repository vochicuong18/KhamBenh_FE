import React, {useEffect,useState} from 'react'
import Header from '../Default/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
export default function Historybook() {
    const [listBooking,setListBooking] = useState([])
    const [idOrder] = useState('')
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/booking/member/get/' + localStorage.getItem('idUser'))
            .then((response) => {
                console.log(response.data)
                setListBooking(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    const formData={
        idOrder: idOrder,
    }
    const ChangeStatus = value => event => {
        console.log(value);
        axios.put(process.env.REACT_APP_API_URL+'/api/booking/cancel/' + value, formData)
        .then(response => {
            window.location.reload()
        })

        .catch((err) => {
        })
    }
    const Payment  = value => event =>{
        const formData={
            idOrder: value,
        }
        // axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
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
    function ChuaThanhToan(data){
        return (
            <Button onClick={Payment(data.set)} className="thanhtoan" variant = 'primary'>Thanh toán</Button>
        );
    }
    function DaThanhToan(){
        return (
            <Button className="thanhtoan" disabled variant = 'outline-success'>Đã thanh toán</Button>
        );
    }
    function Cancel(){
        return (
            <Button className="thanhtoan" disabled variant = 'outline-danger' style= {{marginLeft:'10px'}}>Đã hủy</Button>
        );
    }
    function Active(data) {
        return (
            <Button onClick={ChangeStatus(data.set)} className="thanhtoan" variant = 'danger' style= {{marginLeft:'10px'}}>Hủy lịch hẹn</Button>
        );
    }

    return (
        <div>
            <Header/>
            {listBooking.map((item) =>(
                <div>
                    {item.status ? (
                        
                        <div>
                            <Link to={"/history-book-details/" + item.idOrder.idBooking} style={{color: '#000'}}>
                            <div className='wapper1'>
                                <div className = 'wapper__history'>
                                    <div className = 'book__item khoa'>
                                            <div className = 'item__logoKhoa'>
                                                <Image src = {item.idFaculty.logo} width='50px'/>
                                            </div>
                                            <div className = 'item__nameKhoa'>
                                                <strong>{item.idFaculty.name}</strong>
                                            </div>
                                        </div>
                                        <div className = 'book__item doctor'>
                                            <div className = 'item__degree'>
                                                {item.idDoctor ? item.idDoctor.degree : 'Chưa có bác sĩ'}: 
                                            </div>
                                            <div className = 'item__fullname'>
                                                {item.idDoctor ? item.idDoctor.idUser.fullname :''}
                                            </div>
                                        </div>
                                        <div className = 'book__item timeb'>
                                            <div className = 'item__day'>
                                                Ngày: {item.day}
                                            </div>
                                            <div className = 'item__time'>
                                                Giờ: {item.time}
                                            </div>
                                    </div>
                                </div>
                                <div className='action__history'>
                                {item.idOrder.status ? <DaThanhToan/> : <ChuaThanhToan set = {item.idOrder._id}/>}
                                    {item.status ? <Active set = {item._id}/> : <Cancel/>}
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                    ): (
                    <div>
                        <div className='wapper2'>
                            <div className = 'wapper__history'>
                                <div className = 'book__item khoa'>
                                        <div className = 'item__logoKhoa'>
                                            <Image src = {item.idFaculty.logo} width='50px'/>
                                        </div>
                                        <div className = 'item__nameKhoa'>
                                            <strong>{item.idFaculty.name}</strong>
                                        </div>
                                    </div>
                                    <div className = 'book__item doctor'>
                                        <div className = 'item__degree'>
                                            {item.idDoctor ? item.idDoctor.degree : 'Chưa có bác sĩ'}:
                                        </div>
                                        <div className = 'item__fullname'>
                                            {item.idDoctor ? item.idDoctor.idUser.fullname :''}
                                        </div>
                                    </div>
                                    <div className = 'book__item timeb'>
                                        <div className = 'item__day'>
                                            Ngày: {item.day}
                                        </div>
                                        <div className = 'item__time'>
                                            Giờ: {item.time}
                                        </div>
                                </div>
                            </div>
                            <div className='action__history'>
                                {item.status ? <Active/> : <Cancel/>}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            ))}
        </div>
    )
}
