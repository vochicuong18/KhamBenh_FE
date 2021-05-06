import React, {useRef, useState,useEffect} from 'react';
// import {Form, } from 'react-bootstrap'
import axios from 'axios';
import S3 from 'react-aws-s3';
function Modal_AddDoctor() {
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

    useEffect(() => {
        async function getAPI(){
             await axios.get('http://10.200.0.160:9000/api/faculty/get')
            // axios.get('http://localhost:9000/api/faculty/get')
            .then((response) => {
                setKhoa(response.data);
                return response.data
                
               // console.log(response.data)
                // setKhoa(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
   

    const [fullname, setFullName] = useState('');
    const [avatar, setAvatar] = useState('')
    const [nickname, setNickName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [mail, setMail] = useState('')
    const [idFaculty, setKhoa] = useState([])
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [trainingPlaces, settrainingPlaces] = useState('')
    const [degree , setBangCap] = useState('')
    const [description , setDescription] = useState('')
    const [idRole, setidRole] = useState('608d10b88057022ea4f4c2c6')
    function handleNameBS(e){
        setFullName(e.target.value)
    }
    function handleNickName(e){
        setNickName(e.target.value)
    }
    function handleAddress(e){
        setAddress(e.target.value)
    }
    function handlePhone(e){
        setPhoneNumber(e.target.value)
    }
    function handleMail(e){
        setMail(e.target.value)
    }
    function handleKhoa (e){
        // setKhoa(e.target.value)
        // console.log(e.target.value)
    }
    function handleUserName(e){
        setUserName(e.target.value)
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleNoiDaoTao(e){
        settrainingPlaces(e.target.value)
    }
    function handleBangCap(e){
        setBangCap(e.target.value)
    }
    function handleDes(e){
        setDescription(e.target.value)
    }
    const formData = {
        fullname:fullname,
        avatar:avatar,
        nickname:nickname,
        address:address,
        phoneNumber:phoneNumber,
        mail:mail,
        idFaculty:idFaculty,
        username:username,
        password:password,
        degree:degree,
        trainingPlaces:trainingPlaces,
        description:description,
        idRole:idRole,
    }
    const addDoctor = async () => {
        // await axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
        axios.post('http://10.200.0.160:9000/api/doctor/admin/create', formData)
        .then(response =>{
            console.log(response.formData)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  
    return(
        <div>
            <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Thông tin bác sĩ</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={addDoctor}>
                        <div className="modal-body">                           
                            <div className="form-group">
                                <div className="title__info">
                                    <h5>Thông tin cá nhân</h5>
                                </div>
                                
                                <div className="row"> 
                                    <div className="col">
                                        <label htmlFor="">Họ tên:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                        onChange = {handleNameBS} />   
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Nick name:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                        onChange = {handleNickName} />   
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Description:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                        onChange = {handleDes} />   
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
                                <div className="title__info">
                                    <h5>Trình độ học vấn</h5>
                                </div>
                                <label htmlFor="">Chuyên khoa:</label>
                                <select className= 'form-control' onChange = {handleKhoa}> 
                                    {idFaculty.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <br/>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="">Nơi đào tạo:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                        onChange={handleNoiDaoTao}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="">Bằng cấp:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                        onChange={handleBangCap} />
                                    </div>
                                </div>                               
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
export default Modal_AddDoctor;
