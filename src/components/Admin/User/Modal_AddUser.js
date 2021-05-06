import React from 'react';
import axios from 'axios';

class Modal_AddKhoa extends React.Component {

    state = {
        fullName:'',
        address:'',
        phoneNumber:'',
        mail:'',
        avatar:'',
        idRole:'',
        idAccount:''

    }
    
    handleChangeName = event => {
        this.setState({fullname:event.target.value})
    }

    handleChangeAddress = event => {
        this.setState({address:event.target.value})
    }

    handleChangePhoneNumber = event => {
        this.setState({phoneNumber:event.target.value})
      
    }
    handleChangeMail = event => {
        this.setState({mail:event.target.value})
    }
    handleChangeAvatar = event => {
        this.setState({avatar:event.target.value})
    }
    handleChangeIDRoles = event => {
        this.setState({idRole:event.target.value})
    }
    handleChangeIDAccount = event => {
        this.setState({idAccount:event.target.value})
    }
    handleSubmit = event =>{
       event.preventDefault(); 
       const obj = {
        fullName:this.state.fullName,
        address:this.setState.address,
        phoneNumber:this.setState.phoneNumber,
        mail:this.setState.mail,
        avatar:this.setState.avatar,
        idRole:this.setState.idRole,
        idAccount:this.setState.idAccount
       } 
    axios.post('http://localhost:9000/khoa/create', obj)
    .then(res =>{
         console.log(res.data)
     })
        this.setState({
            fullName:this.state.fullName,
            address:this.setState.address,
            phoneNumber:this.setState.phoneNumber,
            mail:this.setState.mail,
            avatar:this.setState.avatar,
            idRole:this.setState.idRole,
            idAccount:this.setState.idAccount
            
        });
        window.location.reload()
    }
    render () {
        return(
            <div>
                <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông tin khoa</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit = {this.handleSubmit}>
                            <div className="modal-body">                           
                                <div className="form-group">
                                    <label htmlFor="">Tên khoa:</label>
                                    <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength =  {50} onChange = {this.handleChangeName}/>
                                    <label htmlFor="">Chuyên khoa:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" onChange = {this.handleChangeDes} />
                                    <label htmlFor="">Logo:</label>
                                    <input type="file" className="form-control" crossOrigin="anonymous" onChange={this.upload}/>
                                </div>  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </form>  
                    </div>
                    </div>
                </div> 
            </div>
        );
    }
}
export default Modal_AddKhoa;
