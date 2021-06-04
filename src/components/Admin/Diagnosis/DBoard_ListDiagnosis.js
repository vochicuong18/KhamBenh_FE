import React,{ Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import TableRowDiagnosis from './TableRowDiagnosis';
import Importfile from '../Diagnosis/ImportExcel';
import ModalAddDiagnosis  from '../Diagnosis/Modal_AddDiag';

const Content = Layout;
class DBoard_ListDiagnosis extends Component{
    constructor(props) {
        super(props);
        this.state = {diagnosis: []};
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/api/diagnostic/get')
            .then(response => {
                this.setState({diagnosis: response.data});     
          
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
                <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#themBacSi">Import File</button>
                <button type="button" className="btn btn-info btn-sm button__table" data-toggle="modal" data-target="#diagnosis" style ={{marginLeft:'10px'}}>Thêm mới</button>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="site-layout-background">
                    <table className = "table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
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
                <Importfile></Importfile> 
                <ModalAddDiagnosis></ModalAddDiagnosis> 
            </div>
          </Content>

        );
    }
}
export default DBoard_ListDiagnosis;