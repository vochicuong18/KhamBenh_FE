import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRowDiagnosis from './TableRowDiagnosis';
import ModalAddKhoa from '../Khoa/Modal_AddKhoa';
const Content = Layout;
class DBoard_ListDiagnosis extends Component{
    constructor(props) {
        super(props);
        this.state = {diagnosis: []};
    }
    componentDidMount() {
        axios.get('http://localhost:9000/api/diagnostic/get')
            .then(response => {
                this.setState({diagnosis: response.data});     
                const diagnosis = response.data;
                console.log(diagnosis);          
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.diagnosis.map(function (object, i) {
            return <TableRowDiagnosis obj={object} key={i}/>;
        });
    }
    render () {        
        return (
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <strong className="title__table">Danh sách triệu chứng</strong>              
              </Breadcrumb.Item>
              <Breadcrumb.Item> 
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Sympton</th>
                                <th scope="col">Faculty</th>
                                <th scope="col">Action</th>
                            </tr>
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
export default DBoard_ListDiagnosis;