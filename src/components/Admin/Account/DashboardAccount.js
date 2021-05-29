import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import DBoardListAccount from './DBoard_ListAccount'
import {Link} from "react-router-dom"

import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  state = {
    collapsed: false,
  };
    
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to={'/admin-book'}>Danh sách Đặt khám</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="2"><Link to={'/admin-account'}>Danh sách tài khoản</Link></Menu.Item>
              <Menu.Item key="3"><Link to={'/admin-doctor'}>Danh sách bác sĩ</Link></Menu.Item>
              <Menu.Item key="4"><Link to={'/admin-user'}>Danh sách bệnh nhân</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Hệ thống">
              <Menu.Item key="5"><Link to={'/admin-khoa'}>Danh sách khoa</Link></Menu.Item>
              <Menu.Item key="6"><Link to={'/admin-chandoan'}>Danh sách chẩn đoán</Link></Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
            <DBoardListAccount/>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }   
}
export default Dashboard;