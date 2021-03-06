import React,{ useState,useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

function DBoard_ListBooking(){
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
    const columns = [
        {dataField: 'id',text: '#'},
        {dataField: 'customer',text: 'T??n b???nh nh??n'},
        {dataField: 'idDoctor.idUser.fullname',text: 'T??n b??c s??'},
        {dataField: 'idFaculty.name',text: 'Chuy??n khoa'},
        {dataField: 'day',text: 'Ng??y'}, 
        {dataField: 'time',text: 'Gi???'},
        {dataField: 'idOrder.price',text: '????n gi??',formatter:price}, 
        {dataField: 'idOrder.status',text: 'Thanh to??n',formatter: btnPayment},
        {dataField: 'status',text: 'Tr???ng th??i',formatter: Status},
    ];
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <strong className="title__table">Danh s??ch ?????t kh??m</strong>              
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
                            <SearchBar { ...props.searchProps } placeholder ='T??m ki???m nh???ng g?? b???n mu???n' style={{ width:'300px'}}/>
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