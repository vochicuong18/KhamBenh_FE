import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import Importfile from '../Diagnosis/ImportExcel';
import ModalAddDiagnosis  from '../Diagnosis/Modal_AddDiag';
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Link} from "react-router-dom";

function DBoard_ListDiagnosis (){
    const Content = Layout;
    const [listDiag, setListDiag]= useState([])
    const Swal = require('sweetalert2')
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    useEffect(() => {
        async function getAPI(){
            await axios.get(process.env.REACT_APP_API_URL+'/api/diagnostic/get')
            .then((response) => {
                return setListDiag(response.data)             
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        getAPI();
    },[])
    const delDiag =  async (data) => {
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
                axios.delete(process.env.REACT_APP_API_URL+'/api/diagnostic/delete/'+ data)
                .then(response => {
                    axios.get(process.env.REACT_APP_API_URL+'/api/diagnostic/get')
                    .then((response) => {
                        return setListDiag(response.data)             
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    Swal.fire({
                        position: 'center',
                        title: 'Đã xóa thành công',
                        showConfirmButton: false,
                        timer: 1000
                      })
                })
                .catch(err => console.log(err))
               
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
    const symptom =(cell, row, rowIndex, formatExtraData)=>{
        return(
            cell.join(', ')
        )
    }
    const action =(cell, row, rowIndex, formatExtraData)=>{
        return(
            <div>
                <Link to={"/edit/"+ row._id}>
                    <FontAwesomeIcon  icon ={faUserEdit} style={{fontSize:'20px'}} />
                </Link>
                <Button 
                    className='btn__row' 
                    onClick ={()=>delDiag(row._id)}><FontAwesomeIcon 
                    icon ={faTrash} 
                    style={{fontSize:'20px', color:'red',marginLeft:'5px'}}/>
                </Button> 
            </div>
        );
    }
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'name',text: 'Tên bệnh'},
        {dataField: 'idFaculty.name',text: 'Mô tả'},
        {dataField: 'symptom',text: 'Triệu chứng',formatter:symptom},
        {dataField: 'idFaculty.name',text: 'Chuyên khoa'},
        {dataField: '',text: '',formatter: action}
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
            <strong className="title__table">Danh sách triệu chứng</strong>              
            </Breadcrumb.Item>
            <Breadcrumb.Item> 
            <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Import File</button>
            <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#diagnosis" style ={{marginLeft:'10px'}}>Thêm mới</button>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
        <div className="site-layout-background" style={{ padding: 10}}>
                <ToolkitProvider
                    keyField="id"
                    data={ listDiag }
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
            <Importfile></Importfile> 
            <ModalAddDiagnosis></ModalAddDiagnosis> 
        </div>
        </Content>

    );
}
export default DBoard_ListDiagnosis;