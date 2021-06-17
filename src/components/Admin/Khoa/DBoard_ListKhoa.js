import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import ModalAddKhoa from '../Khoa/Modal_AddKhoa';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import NumberFormat from 'react-number-format';
const Content = Layout;
function DBoard_ListFaculty (){
    const [listFaculty,setListFaculty] = useState([])
    const Swal = require('sweetalert2')
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/faculty/get')
             .then(response => {
                setListFaculty(response.data);               
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    const delKhoa =  async (data) => {
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
                axios.delete(process.env.REACT_APP_API_URL+'/api/faculty/delete/'+ data)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        title: 'Đã xóa thành công',
                        showConfirmButton: false,
                        timer: 1000
                      })
                      axios.get(process.env.REACT_APP_API_URL+'/api/faculty/get')
                        .then(response => {
                            setListFaculty(response.data);               
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
                <Link to={"/editkhoa/"+ row._id}>
                    <FontAwesomeIcon  icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <Button 
                    disabled
                    className='btn__row' 
                    onClick ={()=>delKhoa(row._id)}><FontAwesomeIcon 
                    icon ={faTrash} 
                    style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/>
                </Button> 
            </div>
        );
    }
    const price = (cell, row, rowIndex, formatExtraData)=>{
        return(
            <NumberFormat value = {cell} thousandSeparator={true} suffix={' VND'} displayType={'text'}/>  
        );
    }
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'name',text: 'Tên Khoa'},
        {dataField: 'description',text: 'Mô tả'},
        {dataField: 'price',text: 'Đơn giá',formatter:price},
        {dataField: 'logo',text: 'Avatar', formatter:avatar, style:{width:'120px'}},
        {dataField: '',text: '',formatter: action}
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
            <strong className="title__table">Danh sách chuyên khoa</strong>              
            </Breadcrumb.Item>
            <Breadcrumb.Item> 
            <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
            {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <table className = "table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên Khoa</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}                         
                    </tbody>
                </table>
            </div>              */}
            <div className="site-layout-background" style={{ padding: 10}}>
                <ToolkitProvider
                    keyField="id"
                    data={ listFaculty }
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
            <ModalAddKhoa></ModalAddKhoa> 
        </div>
        </Content>

    );
}
export default DBoard_ListFaculty;