import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Image from 'react-bootstrap/Image'

const Content = Layout;
function DBoard_ListDortor (){
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
    const [listDoctor,setListDoctor] = useState([])
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
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'idUser.avatar',text: 'Avatar', formatter:avatar, style:{width:'120px'}},
        {dataField: 'idUser.fullname',text: 'Họ tên'},
        {dataField: 'idFaculty.name',text: 'Chuyên khoa'},
        {dataField: 'idUser.address',text: 'Nơi đào tạo'},
        {dataField: 'degree',text: 'Bằng cấp'},
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <strong className="title__table">Danh sách bác sĩ</strong>              
            </Breadcrumb.Item>
            <Breadcrumb.Item> 
                <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
            <div className="site-layout-background" style={{ padding: 10}}>
                <ToolkitProvider
                    keyField="id"
                    data={ listDoctor }
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
export default DBoard_ListDortor;