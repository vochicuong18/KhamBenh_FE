import React,{ Component } from 'react';
import { Navbar, Nav, NavDropdown, FormControl,Form, Button } from "react-bootstrap"
class Header extends Component {
  render () {
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
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            {/* <Navbar className="navbar" expand="lg">
                <Navbar.Brand><Link to={"/home"}>LCHealth</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link><Link to={"/home"}>Trang Chủ</Link></Nav.Link>
                    <Nav.Link><Link to={"/list-doc"}>Đội Ngũ Bác Sĩ</Link></Nav.Link>
                    <NavDropdown title="Các Dịch Vụ" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Hô Hấp</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Nội</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Tim Mạch</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Button className="mr-sm-2" variant="success">Đăng kí ngay</Button>
                        <Image className="" src="https://sinhnhatchobe.vn/assets/front-site/images/comment.png" width="7%" roundedCircle />
                        <Form.Label>Username</Form.Label>                       
                    </Form>
                </Navbar.Collapse>
            </Navbar> */}
            {/* <div className="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="">Đặt lịch khám tại nhà</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <div className="model__title">
                                <p className='model__title-nd'>Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn</p>
                                <p className='model__title-hotline'>Liên hệ qua hotline</p>
                                <a href="tel:02834563456">
                                    <button type="button" className="btn btn-primary btn__custom">02834563456</button>
                                </a>
                            </div>
                            <div className='form-group'>
                                <label className='text__label'>Họ tên:</label>
                                <input type="text" name="" id="" className="form-control" placeholder="Điền tên đầy đủ" aria-describedby="helpId"/>
                                <label className='text__label'>Số điện thoại:</label>
                                <div className='phone__number'>
                                    <div className='phone__prefix'>
                                        <img alt="Vi" width="24" src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/vi.png" />
                                        <span className ="text"> (+84)</span>
                                    </div>                                    
                                    <input type="text" name="" id="" className="form-control input__phone" placeholder="Số điện thoại" aria-describedby="helpId"/>
                                </div>
                                <label className='text__label'>Tin nhắn:</label>
                                <input type="text" name="" id="" className="form-control" placeholder="Để lại lời nhắn" aria-describedby="helpId"/>
                                
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn__custom" data-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary btn__custom" >Gửi</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
  };
}

export default Header;
