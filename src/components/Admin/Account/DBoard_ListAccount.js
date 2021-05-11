import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRowUser from './TableRowAccount';
import ModalAddAccount from '../Account/Modal_AddAccount';
const Content = Layout;
class DBoard_ListDortor extends Component{
    constructor(props) {
        super(props);
        this.state = {bacsi: []};
    }
    componentDidMount() {
        axios.get('http://localhost:9000/api/account/get')
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
                <strong className="title__table">Danh sách tài khoản</strong>              
              </Breadcrumb.Item>
              <Breadcrumb.Item> 
                <button disabled type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Thêm mới</button>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Chức vụ</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}                         
                        </tbody>
                    </table>
                </div>             
                <ModalAddAccount></ModalAddAccount> 
            </div>
          </Content>

        );
    }
}
export default DBoard_ListDortor;