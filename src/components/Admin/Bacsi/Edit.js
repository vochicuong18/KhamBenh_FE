import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import S3 from 'react-aws-s3';
function Edit (props) {
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })   
    const id = props.match.params._id
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
             await axios.get('http://localhost:9000/api/faculty/get')
            .then((response) => {
                setKhoa(response.data);
                return response.data
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
    const [savekhoa, setSaveKhoa] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [trainingPlaces, settrainingPlaces] = useState('')
    const [degree , setBangCap] = useState('')
    const [description , setDescription] = useState('')
    const [idRole] = useState('608d10b88057022ea4f4c2c6')
    function handleNameBS(e){
        e.preventDefault()
        setFullName(e.target.value)
    }
    function handleNickName(e){
        e.preventDefault()
        setNickName(e.target.value)
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
    function handleKhoa (e){
        e.preventDefault()
        setSaveKhoa(e.target.value)
    }
    function handleUserName(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handlePassword(e){
        e.preventDefault()
        setPassword(e.target.value)
    }
    function handleNoiDaoTao(e){
        e.preventDefault()
        settrainingPlaces(e.target.value)
    }
    function handleBangCap(e){
        e.preventDefault()
        setBangCap(e.target.value)
    }
    function handleDes(e){
        e.preventDefault()
        setDescription(e.target.value)
    }
    const formData = {
        fullname:fullname,
        avatar:avatar,
        nickname:nickname,
        address:address,
        phoneNumber:phoneNumber,
        mail:mail,
        idFaculty:savekhoa,
        username:username,
        password:password,
        degree:degree,
        trainingPlaces:trainingPlaces,
        description:description,
        idRole:idRole,
    }
   
    useEffect(() => {
        async function getAPI(props){
             await axios.get('http://localhost:9000/api/doctor/get/' + id)
             .then(response => {
                    setFullName(response.data.idUser.fullname)
                    setNickName(response.data.nickname)
                    setAddress(response.data.idUser.address)
                    setPhoneNumber(response.data.idUser.phoneNumber)
                    setMail(response.data.idUser.mail)
                    setUserName(response.data.idUser.idAccount.username)
                    setPassword(response.data.idUser.idAccount.password)
                    setBangCap(response.data.degree)
                    settrainingPlaces(response.data.trainingPlaces)
                    setDescription(response.data.description)
             })
             .catch(function (error) {
                 console.log(error);              
             }) 
            }         
        getAPI();
    },[id])
        
    
    const updateDoctor = async () => {
        console.log(formData);
        axios.put('http://localhost:9000/api/doctor/admin/update/' +id, formData)
        .then(response => {
            toast.success("Chỉnh sửa thành công")
            props.history.push('/admin-doctor')
        })

        .catch((err) => {
            toast.error(err.response.data.message)
        })
        
    }
           
    return (
        <div>
            <div className="" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Cập nhật thông tin bác sĩ</h3>
                        </div>
                    <form >
                        <div className="modalbody">                           
                            <div className="form-group">
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {fullname}  onChange = {handleNameBS}  />   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Nick name:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {nickname} onChange = {handleNickName}/>   
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Description:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                             defaultValue = {description} onChange = {handleDes}/>   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                        </div>
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    defaultValue = {address} onChange = {handleAddress}/>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                             defaultValue = {phoneNumber} onChange = {handlePhone}/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {mail} onChange = {handleMail}  />
                                        </div>
                                    </div>
                                </div>
                                <div className="form__info">
                                    <div className="title__info">
                                        <h5>Trình độ học vấn</h5>
                                    </div>
                                    <label htmlFor="">Chuyên khoa:</label>
                                    <select className= 'form-control' onChange={handleKhoa}>
                                        <option>Chọn chuyên khoa</option>
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
                                            defaultValue={trainingPlaces} onChange={handleNoiDaoTao}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Bằng cấp:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            defaultValue={degree} onChange = {handleBangCap}   />
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
                                        defaultValue={username} onChange = {handleUserName}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="">Mật khẩu:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                       defaultValue ={password} onChange = {handlePassword} />
                                    </div>
                                </div>         
                                </div>
                                            
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" onClick={updateDoctor} className="btn btn-primary">Lưu</button>
                        </div>
                    </form>  
                    </div>
                </div>
            </div>
        </div>
    )
                    
}
export default Edit;