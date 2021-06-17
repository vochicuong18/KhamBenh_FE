import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckAlt,faCalendarWeek,faUserAlt,faUserMd } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';

export default function Total() {
    const [listDoctor,setListDoctor] = useState([])
    const [listUser,setListUser] = useState([])
    const [listBook,setListBook] = useState([])
    const [status,setStatus] = useState(false)
    const [statusSale,setStatusSale] = useState(false)

    const [listSales,setListSales] = useState([])
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/member/get')
             .then(response => {
                setListUser(response.data);  
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get')
             .then(response => {
                setListDoctor(response.data);               
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/statistic/StatisticsBookingByYear/2021')
             .then(response => {
                setListBook(response.data); 
                setStatus(true)
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/statistic/StatisticsSalesByYear/2021')
             .then(response => {
                setListSales(response.data); 
                setStatusSale(true)              
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    return (
        <div className="total">
            <div className="total__card">
                <div className="total__title">
                    Doanh thu
                    <div className="total__icon">
                        <FontAwesomeIcon icon ={faMoneyCheckAlt} style={{fontSize:'33px', color:'#E8B65B'}} />
                    </div>
                </div>
                <div className="total__number">
                    {statusSale ?  <NumberFormat value = {listSales.reduce(reducer)} thousandSeparator={true} suffix={''} displayType={'text'}/>: '0'}
                </div>
            </div>
            <div className="total__card">
                <div className="total__title">
                    Tổng lịch khám
                    <div className="total__icon">
                        <FontAwesomeIcon icon ={faCalendarWeek} style={{fontSize:'33px', color:'#E23E75'}} />
                    </div>
                </div>
                <div className="total__number">
                    {status ? listBook.reduce(reducer) : '0'}
                   
                </div>
            </div>
            <div className="total__card">
                <div className="total__title" >
                    Bệnh nhân
                    <div className="total__icon">
                        <FontAwesomeIcon icon ={faUserAlt} style={{fontSize:'33px', color:'#000000'}} />
                    </div>
                </div>
                <div className="total__number">
                    {listUser.length}
                </div>
            </div>
            <div className="total__card">
                <div className="total__title" >
                    Bác sĩ
                    <div className="total__icon">
                        <FontAwesomeIcon icon ={faUserMd} style={{fontSize:'33px', color:'#14CEF3'}} />
                    </div>
                </div>
                <div className="total__number">
                    {listDoctor.length}
                </div>
            </div>
        </div>
    )
}
