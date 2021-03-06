import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom"
import Infomember from '../Password/InforMember'
import { Navbar, Nav, NavDropdown,Form, Image,Button} from "react-bootstrap"
function Header(props) {
    localStorage.removeItem('idAdmin')
    localStorage.removeItem('idDoctor')
    const history = useHistory();
    const [fullname,setFullname] = useState('')
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
      async function getAPI(){
           await axios.get(process.env.REACT_APP_API_URL+'/api/member/get/' + localStorage.getItem('idUser'))
          .then((response) => {
            setFullname(response.data.idUser.fullname);
            setAvatar(response.data.idUser.avatar)
          })
          .catch((err) => {
          });
      }
      getAPI();
    },[])
    function logout(){
        localStorage.removeItem('idUser')
        localStorage.removeItem('idAdmin')
        localStorage.removeItem('idDoctor')
        localStorage.removeItem('bookDoctor')
        localStorage.removeItem('bookDate')
        localStorage.removeItem('bookTime')
        localStorage.removeItem('bookFac')
        localStorage.removeItem('Khoa')
        localStorage.removeItem('Name')
        localStorage.removeItem('idGoogle')
        window.location.reload()
    }
    function login(){
        history.push("/login")
    }
    function historybook(){
        history.push("/history-book")
    }
    function ChangePass(){
        history.push("/change-pass")
    }
        return (
            <div>
                <Infomember/>
                <Navbar className="navbar" bg="light" expand="lg" style={{height:'70px'}}>
                    <Navbar.Brand href="/home">
                        <Image src='https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/logo12.png'
                            style={{width:'200px',objectFit: 'cover'}}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/booking">?????t kh??m ngay</Nav.Link>
                        <Nav.Link href="/list-doc">?????i Ng?? B??c S??</Nav.Link>
                        <Nav.Link href="https://tokhaiyte.vn/">Khai b??o y t???</Nav.Link>
                        <Nav.Link href="/home#nhaptrieuchung">Ch???n ??o??n</Nav.Link>
                        </Nav>
                        {!avatar ?  
                        <Form inline>
                            <Button onClick={login} variant="outline-success">????ng nh???p</Button>
                        </Form> : 
                        <Form inline>
                            <Form.Label className="mr-sm-2"  data-toggle="modal" data-target="#infomember">{fullname}</Form.Label>
                            {localStorage.getItem('idGoogle') ?
                                <NavDropdown  
                                    title={
                                        <Image 
                                            roundedCircle 
                                            src={avatar} alt=''
                                            style={{width: '50px', height:'50px', objectFit: 'cover'}}
                                        />
                                    }
                                >   <NavDropdown.Item onClick = {logout}>????ng xu???t</NavDropdown.Item>
                                    <NavDropdown.Item onClick = {historybook}>L???ch kh??m c???a t??i</NavDropdown.Item>
                                </NavDropdown>
                            :
                                <NavDropdown  
                                    title={
                                        <Image 
                                            roundedCircle 
                                            src={avatar} alt=''
                                            style={{width: '50px', height:'50px', objectFit: 'cover'}}
                                        />
                                    }
                                >   
                                
                                    <NavDropdown.Item onClick = {logout}>????ng xu???t</NavDropdown.Item>
                                    <NavDropdown.Item onClick = {ChangePass}>?????i m???t kh???u</NavDropdown.Item>
                                    <NavDropdown.Item onClick = {historybook}>L???ch kh??m c???a t??i</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Form>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
      
export default Header;
