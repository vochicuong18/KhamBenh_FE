import React, {useRef, useState} from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Modal_AddUser() {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    const fileInput= useRef();
    function handleClick(event) {
        event.preventDefault();
        let file = fileInput.current.files[0]
        let newFileName  = fileInput.current.files[0].name
        const config ={
            bucketName:'imagebucketkhambenhonl-1',
            region: 'ap-southeast-1',
            accessKeyId: 'AKIA2MU3WQQLMHPPIHGJ',
            secretAccessKey: '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',
            ContentType :'image/jpeg', //<-- this is what you need!
            ACL         :'public-read'//<-- this makes it public so people can see it
        }
        const ReactS3Client = new S3 (config)
        ReactS3Client.uploadFile(file,newFileName)
        .then( data =>{
            console.log(data);
            if(data.status === 204){
                console.log('success')
                console.log(data.location)
                setAvatar(data.location)
            }else {
                console.log('fail');
            }
        })
    }
    const [fullname, setFullName] = useState('');
    const [avatar, setAvatar] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [mail, setMail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [idRole] = useState('608d70c9c7b4fa2708e30e6a')
    function handleNameBS(e){
        e.preventDefault()
        setFullName(e.target.value)
    }
    function handleAddress(e){
        e.preventDefault()
        setAddress(e.target.value)
    }
    function handlePhone(e){
        e.preventDefault()
        setPhoneNumber(e.target.value)
    }
    function handleMail(e){
        e.preventDefault()
        setMail(e.target.value)
    }
    
    function handleUserName(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handlePassword(e){
        e.preventDefault()
        setPassword(e.target.value)
    }
    const formData = {
        fullname:fullname,
        avatar:avatar,
        address:address,
        phoneNumber:phoneNumber,
        mail:mail,
        username:username,
        password:password,
        idRole:idRole,
    }
    const addDoctor = async () =>{
        axios.post(process.env.REACT_APP_API_URL+'/api/member/admin/create', formData)
        .then(response => {
            toast.success('Thêm thành công')
            window.location.reload()
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
     }
    return(
        <div>
            <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Thông tin bệnh nhân</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">                           
                            <div className="form-group ">
                                <div className='form__info'>
                                    <div className="title__info first__title">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            onChange = {handleNameBS} />   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                        </div>
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    onChange = {handleAddress} />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            onChange={handlePhone} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            onChange ={handleMail} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Tài khoản</h5>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="">Username:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            onChange = {handleUserName}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Mật khẩu:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                            onChange = {handlePassword}/>
                                        </div>
                                    </div>              
                                </div>
                                     
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" onClick = {addDoctor} className="btn btn-primary">Lưu</button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>
    );
    
}
export default Modal_AddUser;
