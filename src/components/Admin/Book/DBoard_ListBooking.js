import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRow from './TableRow';
// import ModalAddDoctor from './Modal_AddDoctor';
const Content = Layout;
class DBoard_ListDortor extends Component{
    constructor(props) {
        super(props);
        this.state = {book: []};
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/api/booking/get')
            .then(response => {
                console.log(response.data);
                this.setState({book: response.data});               
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    tabRow() {
        return this.state.book.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }
    render () {        
        return (
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <strong className="title__table">Danh sách đặt khám</strong>              
              </Breadcrumb.Item>
              <Breadcrumb.Item> 
                <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên bệnh nhân</th>
                                <th scope="col">Tên bác sĩ</th>
                                <th scope="col">Chuyên khoa</th>
                                <th scope="col">Ngày</th>
                                <th scope="col">Giờ</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Thanh toán</th>
                                <th scope='col'>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}                         
                        </tbody>
                    </table>
                </div>             
                {/* <ModalAddDoctor></ModalAddDoctor>  */}
            </div>
          </Content>

        );
    }
}
export default DBoard_ListDortor;