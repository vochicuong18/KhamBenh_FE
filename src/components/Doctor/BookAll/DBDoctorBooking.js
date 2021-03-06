import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom"
import DBoardListBooking from '../BookAll/DoctorListBooking';
import Image from 'react-bootstrap/Image'
import axios from 'axios';

import {
  SettingOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const {  Footer, Sider } = Layout;
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
  logout(props){
    localStorage.removeItem('idUser')
    localStorage.removeItem('bookDoctor')
    localStorage.removeItem('bookDate')
    localStorage.removeItem('bookTime')
    localStorage.removeItem('bookFac')
    localStorage.removeItem('Khoa')
    localStorage.removeItem('Name')
    localStorage.removeItem('idDoctor')
    window.location.reload()
}
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" /> 
          {localStorage.getItem('idDoctor')?
          <div>
             <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             <Menu.Item icon={ <Image 
                src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/logo12.png'
                style={{width:'150px',objectFit: 'cover',marginLeft:'-5px',marginTop:'-10px'}}
                />}>
                  <Link to={'/'}></Link>
            </Menu.Item>
             <Menu.Item icon={<Image src={this.state.avata} roundedCircle  width="25%"  height="38px" style = {{objectFit:'cover'}}/>}>
                <Link to={'/doctor'}>{this.state.name}</Link>
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined />}>
                <Link to={'/doctor-your-booking'}>Danh s??ch l???ch kh??m</Link>
            </Menu.Item >
            <SubMenu icon={<UserOutlined />} title="User">
              <Menu.Item><Link to={'/doctor-listdoctor'}>Danh s??ch b??c s??</Link></Menu.Item>
              <Menu.Item><Link to={'/doctor-user'}>Danh s??ch b???nh nh??n</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<TeamOutlined />} title="H??? th???ng">
              <Menu.Item><Link to={'/doctor-bookall'}>Danh s??ch ?????t kh??m</Link></Menu.Item>
              <Menu.Item><Link to={'/doctor-chandoan'}>Danh s??ch Ch???n ??o??n</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<SettingOutlined />} title="C??i ?????t">
              <Menu.Item><Link to={'/home'}>Trang Ch???</Link></Menu.Item>
              <Menu.Item onClick={this.logout}>????ng xu???t</Menu.Item>
              <Menu.Item><Link to={'/doctor-change-pass'}>?????i m???t kh???u</Link></Menu.Item>
            </SubMenu>
            </Menu>
          </div> :<div>
             <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             <Menu.Item>
                <Link to={'/'}>????ng nh???p</Link>
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined />}>
                <Link to={'/'}>Danh s??ch l???ch kh??m</Link>
            </Menu.Item >
            <SubMenu icon={<UserOutlined />} title="User">
              <Menu.Item><Link to={'/'}>Danh s??ch b??c s??</Link></Menu.Item>
              <Menu.Item><Link to={'/'}>Danh s??ch b???nh nh??n</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<TeamOutlined />} title="H??? th???ng">
              <Menu.Item><Link to={'/'}>Danh s??ch ?????t kh??m</Link></Menu.Item>
              <Menu.Item><Link to={'/'}>Danh s??ch Ch???n ??o??n</Link></Menu.Item>
            </SubMenu>
            <SubMenu icon={<SettingOutlined />} title="C??i ?????t">
              <Menu.Item><Link to={'/home'}>Trang Ch???</Link></Menu.Item>
            </SubMenu>
            </Menu>
          </div>
          }
        </Sider>
        <Layout className="site-layout">

          <DBoardListBooking/>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
  }   
}
export default Dashboard;