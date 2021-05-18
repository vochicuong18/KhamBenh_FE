import React, {useEffect,useState} from 'react'
import Header from '../Default/Header'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
export default function Historybook() {
    const [listBooking,setListBooking] = useState([])
    useEffect(() => {
        async function getAPI(){
             await axios.get('http://10.200.0.160:9000/api/booking/member/get/' + localStorage.getItem('idUser'))
            .then((response) => {
                setListBooking(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    function ChuaThanhToan(){
        return (
            <div className = 'action__history'>
                    <Button variant = 'primary'>Thanh toán</Button>
                    <Button variant = 'outline-danger' style= {{marginLeft:'10px'}}>Hủy cuộc hẹn</Button>
            </div>
        );
    }
    function DaThanhToan(){
        return (
            <div className = 'action__history'>
                    <Button disabled variant = 'outline-success'>Đã thanh toán</Button>
                    <Button variant = 'outline-danger' style= {{marginLeft:'10px'}}>Hủy cuộc hẹn</Button>
            </div>
        );
    }
   
    return (
        <div>
            <Header/>
            {listBooking.map((item) =>(
                <div className="wapper1">
                    <div className = 'wapper__history'>
                        <div className = 'book__item khoa'>
                                <div className = 'item__logoKhoa'>
                                    <Image alt src =  {item.idFaculty.logo} width='50px'/>
                                    
                                </div>
                                <div className = 'item__nameKhoa'>
                                    <strong>{item.idFaculty.name}</strong>
                                </div>
                            </div>
                            <div className = 'book__item doctor'>
                                <div className = 'item__degree'>
                                    {item.idDoctor.degree}: 
                                </div>
                                <div className = 'item__fullname'>
                                    {item.idDoctor.idUser.fullname}
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
                    {/* <div className = 'action__history'>
                        <Button variant = 'primary'>Thanh toán</Button>
                        <Button variant = 'outline-danger' style= {{marginLeft:'10px'}}>Hủy cuộc hẹn</Button>
                    </div> */}
                    {item.idOrder.status ? <DaThanhToan/> : <ChuaThanhToan/>}
                </div>
               
          ))}
        </div>
    )
}
