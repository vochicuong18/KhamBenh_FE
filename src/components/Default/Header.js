import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown,Form, Image } from "react-bootstrap"
function Header(props) {
    const [fullname,setFullname] = useState('')
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
      async function getAPI(){
           await axios.get('http://localhost:9000/api/member/get/' + localStorage.getItem('idUser'))
          .then((response) => {
            setFullname(response.data.idUser.fullname);
            setAvatar(response.data.idUser.avatar)
          })
          .catch((err) => {
              console.log(err);
          });
      }
      getAPI();
  },[])
    return (
        <div>
            <Navbar className="navbar" bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/list-doc">Đội Ngũ Bác Sĩ</Nav.Link>
                    <NavDropdown title="Các Dịch Vụ" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="/list-doc">Hô Hấp</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Nội</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Tim Mạch</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Form.Label className="mr-sm-2" >{fullname}</Form.Label>
                        <div>
                            <Image 
                                roundedCircle 
                                src={avatar} alt='avatar'
                                style={{width: '50px', height:'50px', objectFit: 'cover'}}
                            />
                        </div>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
export default Header;
