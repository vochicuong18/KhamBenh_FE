import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import DBoardListDoctor from '../Bacsi/DBoard_ListDoctor';
import Image from 'react-bootstrap/Image'
import {Link} from "react-router-dom"

import {
  SettingOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
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
          <Menu.Item icon={ <Image 
                src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/logo12.png'
                style={{width:'150px',objectFit: 'cover',marginLeft:'-5px',marginTop:'-10px'}}
                />}>
                  <Link to={'/'}></Link>
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined />}>
              <Link to={'/admin'}>Thống kê</Link>
            </Menu.Item>
            <Menu.Item icon={<UnorderedListOutlined />}>
              <Link to={'/admin-book'}>Danh sách Đặt khám</Link>
            </Menu.Item>
            <SubMenu icon={<UserOutlined />} title="User">
            <Menu.Item><Link to={'/admin-account'}>Danh sách tài khoản</Link></Menu.Item>
              <Menu.Item><Link to={'/admin-doctor'}>Danh sách bác sĩ</Link></Menu.Item>
              <Menu.Item><Link to={'/admin-user'}>Danh sách bệnh nhân</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<TeamOutlined />} title="Hệ thống">
              <Menu.Item><Link to={'/admin-khoa'}>Danh sách khoa</Link></Menu.Item>
              <Menu.Item><Link to={'/admin-chandoan'}>Danh sách chẩn đoán</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<SettingOutlined />} title="Cài đặt">
              <Menu.Item><Link to={'/'}>Đăng xuất</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
            <DBoardListDoctor/>
        </Layout>
      </Layout>
    );
  }   
}
export default Dashboard;