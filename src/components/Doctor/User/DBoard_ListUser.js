import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRowUser from './TableRowUser';
import ModalAddUser from '../User/Modal_AddUser';
const Content = Layout;
class DBoard_ListDortor extends Component{
    constructor(props) {
        super(props);
        this.state = {bacsi: []};
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/api/member/get')
            .then(response => {
                console.log(response.data);
                this.setState({bacsi: response.data});               
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.bacsi.map(function (object, i) {
            return <TableRowUser obj={object} key={i}/>;
        });
    }
    render () {        
        return (
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <strong className="title__table">Danh sách người dùng</strong>              
              </Breadcrumb.Item>
              <Breadcrumb.Item> 
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Đỉa chỉ</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Avatar</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}                         
                        </tbody>
                    </table>
                </div>             
                <ModalAddUser></ModalAddUser> 
            </div>
          </Content>

        );
    }
}
export default DBoard_ListDortor;