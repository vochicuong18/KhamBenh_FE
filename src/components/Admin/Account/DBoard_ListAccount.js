import React,{useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { toast } from 'react-toastify'
import axios from 'axios';
import ModalAddAccount from '../Account/Modal_AddAccount';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Button} from 'react-bootstrap'
function DBoard_ListDortor(){
    const Content = Layout;
    const [account, setAccount] = useState([])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/account/get')
             .then(response => {
                 setAccount(response.data);               
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    const delAcc =  async (data) => {
        console.log(data);
        axios.delete(process.env.REACT_APP_API_URL+'/api/account/delete/'+ data)
        .then((response) => {
            toast.error(response);
        })
        .catch((err) => {
            toast.error(err.response.data.message);
        });
    }
    const { SearchBar } = Search;
    const options = {
        defaultPageSize:10,
        sizePerPage: 10,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
    }
    const action =(cell, row, rowIndex, formatExtraData)=>{
        return(
            <div>
                <Link to={"/editaccount/"+ row._id}>
                    <FontAwesomeIcon  icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <Button 
                    className='btn__row' 
                    onClick ={()=>delAcc(row._id)}><FontAwesomeIcon 
                    icon ={faTrash} 
                    style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/>
                </Button> 
            </div>
        );
    }
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'username',text: 'Username'},
        {dataField: 'password',text: 'Password'},
        {dataField: 'idRole.name',text: 'Chức vụ'},
        {dataField: '',text: '',formatter: action}
    ];
        return (
            <div>
                <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <strong className="title__table">Danh sách tài khoản</strong>              
                </Breadcrumb.Item>
                <Breadcrumb.Item> 
                    <button disabled type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
                </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <div className="site-layout-background" style={{ padding: 10}}>
                        <ToolkitProvider
                            keyField="id"
                            data={ account }
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
                    <ModalAddAccount></ModalAddAccount> 
                </div>
                </Content>
            </div>
        );
}
export default DBoard_ListDortor;