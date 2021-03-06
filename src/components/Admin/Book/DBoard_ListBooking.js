import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faCheck,faTimes,faBan} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

function DBoard_ListBooking(){
   
    const Swal = require('sweetalert2')
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    const Content = Layout;


    const [listBook, setListBooking] = useState([])
    useEffect(() => {
        async function getAPI(){
            await axios.get(process.env.REACT_APP_API_URL+'/api/booking/get')
            .then((response) => {
                return setListBooking(response.data)             
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        getAPI();
    },[])
   

    function ChangeStatus(data) {
        const formData={
        }
        Swal.fire({
            title: 'Thay đổi trạng thái lịch?',
            text: "Lịch khám sẽ hủy sao khi bạn làm điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(process.env.REACT_APP_API_URL+'/api/booking/cancel/'+ data,formData)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        title: 'Hủy lịch thành công',
                        showConfirmButton: false,
                        timer: 1000
                    })     
                    axios.get(process.env.REACT_APP_API_URL+'/api/booking/get')
                    .then((response) => {
                        setListBooking(response.data)  
                             
                    })
                   
                    .catch(function (error) {
                        console.log(error);
                    }) 
                })
               
                .catch(err => toast.error(err.response.data.message))
                
            }
          })
    }
    const delBook =  async (data) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            text: "Bạn sẽ không thể hoàn tác lại điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete(process.env.REACT_APP_API_URL+'/api/booking/delete/'+ data )
            .then(response => {
                Swal.fire({
                    position: 'center',
                    title: 'Đã xóa thành công',
                    showConfirmButton: false,
                    timer: 1000
                })
                axios.get(process.env.REACT_APP_API_URL+'/api/booking/get')
                    .then((response) => {
                        setListBooking(response.data)             
                    })
                    .catch(function (error) {
                        console.log(error);
                    }) 
            })
           
            .catch(err => toast.error(err.response.data.message))
            }
          })
    }
    const { SearchBar } = Search;
    const options = {
        defaultPageSize:10,
        sizePerPage: 10,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
    };
   
    const btnPayment = (cell, row, rowIndex, formatExtraData)=>{
        return(
            cell ? <FontAwesomeIcon icon ={faCheck} style={{fontSize:'20px', color:'green',marginLeft:'20px'}}/> :<FontAwesomeIcon icon ={faTimes} style={{fontSize:'20px', color:'red',marginLeft:'20px'}}/>
                
        );
    }
    const Status = (cell, row, rowIndex, formatExtraData)=>{
        return(
            <div>
                {cell ?
                    <span className="active">Active</span>:
                    <span className="cancel">Cancel</span>}
            </div>
        );
    }
    const price = (cell, row, rowIndex, formatExtraData)=>{
        return(
            <NumberFormat value = {cell} thousandSeparator={true} suffix={' VND'} displayType={'text'}/>  
        );
    }
    const action =(cell, row, rowIndex, formatExtraData)=>{
        return(
            <div>
                {row.status ? 
                <Button
                    className='btn__row'
                    onClick={()=>ChangeStatus(row._id)}>
                    <FontAwesomeIcon  icon ={faBan} style={{fontSize:'20px',color:'red'}}/>
                </Button> :
                    <Button  
                    disabled
                    className='btn__row'
                    onClick={()=>ChangeStatus(row._id)}>
                    <FontAwesomeIcon  icon ={faBan} style={{fontSize:'20px',color:'black'}}/>
                </Button>}
                {row.idOrder.status ?
                <Button
                    className='btn__row' 
                    onClick={()=>delBook(row._id)}
                    >
                    <FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'black'}}/>
                </Button> :
                <Button 
                    className='btn__row' 
                    onClick={()=>delBook(row._id)}>
                    <FontAwesomeIcon icon ={faTrash} style={{fontSize:'20px', color:'red'}}/>
                </Button>}
            </div>
        );
    }
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'customer',text: 'Tên bệnh nhân'},
        {dataField: 'idDoctor.idUser.fullname',text: 'Tên bác sĩ'},
        {dataField: 'idFaculty.name',text: 'Chuyên khoa'},
        {dataField: 'day',text: 'Ngày'}, 
        {dataField: 'time',text: 'Giờ'},
        {dataField: 'idOrder.price',text: 'Đơn giá',formatter:price}, 
        {dataField: 'idOrder.status',text: 'Thanh toán',formatter: btnPayment},
        {dataField: 'status',text: 'Trạng thái',formatter: Status},
        {dataField: '',text: '',formatter: action}
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <strong className="title__table">Danh sách đặt khám</strong>              
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
            <div className="site-layout-background" style={{ padding: 10}}>
            <ToolkitProvider
                keyField="id"
                data={ listBook }
                columns={ columns }
                search
            >
                {
                    props => (
                    <div>
                        <div  className = 'float-right'>
                            <SearchBar { ...props.searchProps } placeholder ='Tìm kiếm những gì bạn muốn' style={{ width:'300px'}}/>
                        </div>
                        <BootstrapTable
                        bootstrap4
                        { ...props.baseProps }
                        pagination={paginationFactory(options) }
                        />
                    </div>
                    )
                }
            </ToolkitProvider>
            </div>   
        </div>
        </Content>
    );
}
export default DBoard_ListBooking;