import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import DBoardListUser from './DBoard_ListUser'
import {Link} from "react-router-dom"
import Image from 'react-bootstrap/Image'
import axios from 'axios';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {name:'',avata:''};
}
state = {
collapsed: false,
};
onCollapse = collapsed => {
console.log(collapsed);
this.setState({ collapsed });
};
componentDidMount() {
axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/' + localStorage.getItem('idUser'))
    .then(response => {
        console.log(response.data);
        this.setState({
            name:response.data.idUser.fullname,
            avata:response.data.idUser.avatar
        })
    })
    .catch(function (error) {
        console.log(error);
    })
}
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item icon={<Image src={this.state.avata} roundedCircle  width="25%"  height="38px" style = {{objectFit:'cover'}}/>}>
                <Link to={'/doctor'}>{this.state.name}</Link>
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined />}>
                <Link to={'/doctor-your-booking'}>Danh sách lịch khám</Link>
            </Menu.Item >
            <SubMenu icon={<UserOutlined />} title="User">
            <Menu.Item><Link to={'/doctor-listdoctor'}>Danh sách bác sĩ</Link></Menu.Item>
              <Menu.Item><Link to={'/doctor-user'}>Danh sách bệnh nhân</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<TeamOutlined />} title="Hệ thống">
              <Menu.Item><Link to={'/doctor-bookall'}>Danh sách Đặt khám</Link></Menu.Item>
              <Menu.Item><Link to={'/doctor-chandoan'}>Danh sách Chẩn đoán</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}></Header>
        <DBoardListUser/>
        <Footer style={{ textAlign: 'center' }}>LC Health</Footer>
      </Layout>
    </Layout>
    );
  }   
}
export default Dashboard;