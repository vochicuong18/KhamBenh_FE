import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRowKhoa from './TableRowKhoa';
import ModalAddKhoa from '../Khoa/Modal_AddKhoa';
const Content = Layout;
class DBoard_ListDortor extends Component{
    constructor(props) {
        super(props);
        this.state = {bacsi: []};
    }
    componentDidMount() {
        axios.get('http://localhost:9000/khoa/getall')
            .then(response => {
                this.setState({bacsi: response.data});               
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.bacsi.map(function (object, i) {
            return <TableRowKhoa obj={object} key={i}/>;
        });
    }
    render () {        
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
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên Khoa</th>
                                <th scope="col">Description</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Action</th>
                            </tr>

                            {/* <tr>
                                <th scope="col">temp</th>
                                <th scope="col">timeStamp</th>
                                <th scope="col">co2</th>
                                <th scope="col">hum</th>
                            </tr> */}
                        </thead>
                        <tbody>
                            {this.tabRow()}                         
                        </tbody>
                    </table>
                </div>             
                <ModalAddKhoa></ModalAddKhoa> 
            </div>
          </Content>

        );
    }
}
export default DBoard_ListDortor;