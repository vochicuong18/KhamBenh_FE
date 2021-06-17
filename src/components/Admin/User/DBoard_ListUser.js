import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify'

import ModalAddUser from '../User/Modal_AddUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Image from 'react-bootstrap/Image'
function DBoard_ListUser(){
    const Content = Layout;
    const [listUser,setListUser] = useState([])
    const Swal = require('sweetalert2')
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
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
    const delUser =  async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_URL+'/api/member/delete/'+ data)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        title: 'Đã xóa thành công',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    axios.get(process.env.REACT_APP_API_URL+'/api/member/get')
                    .then(response => {
                        setListUser(response.data);               
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
    }
    const avatar =(cell, row, rowIndex, formatExtraData)=>{
        return (
            <Image src={cell} width="70%" height="60px" style = {{objectFit:'cover'}} roundedCircle/>
        )
    }
    const action =(cell, row, rowIndex, formatExtraData)=>{
        return(
            <div>
                <Link to={"/edituser/"+ row._id}>
                    <FontAwesomeIcon  icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <Button 
                    className='btn__row' 
                    onClick ={()=>delUser(row._id)}><FontAwesomeIcon 
                    icon ={faTrash} 
                    style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/>
                </Button> 
            </div>
        );
    }
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'idUser.avatar',text: 'Avatar', formatter:avatar, style:{width:'120px'}},
        {dataField: 'idUser.fullname',text: 'Họ tên'},
        {dataField: 'idUser.address',text: 'Đỉa chỉ'},
        {dataField: 'idUser.phoneNumber',text: 'Số điện thoại'},
        {dataField: 'idUser.mail',text: 'Email'},
        {dataField: 'idUser.idAccount.username',text: 'Username'},
        {dataField: '',text: '',formatter: action}
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
            <strong className="title__table">Danh sách người dùng</strong>              
            </Breadcrumb.Item>
            <Breadcrumb.Item> 
            <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
                <div className="site-layout-background" style={{ padding: 10}}>
                        <ToolkitProvider
                            keyField="id"
                            data={ listUser }
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
            <ModalAddUser></ModalAddUser> 
        </Content>

    );
}
export default DBoard_ListUser;