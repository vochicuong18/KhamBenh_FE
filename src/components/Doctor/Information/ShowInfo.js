import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import S3 from 'react-aws-s3';
import Image from 'react-bootstrap/Image'
export default function ShowInfo(){
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

    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/faculty/get')
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
    const [show,setShow] = useState(true)
    const [showEdit,setShowEdit] = useState(false)
    const [fullname, setFullName] = useState('')
    const [nameKhoa, setNameKhoa] = useState('')
    const [nickname, setNickName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [mail, setMail] = useState('')
    const [savekhoa, setSaveKhoa] = useState()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [trainingPlaces, settrainingPlaces] = useState('')
    const [degree , setBangCap] = useState('')
    const [description , setDescription] = useState('')
    const [avatar, setAvatar] = useState('https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/user.png')
    const [idFaculty, setKhoa] = useState([])
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
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/' + localStorage.getItem('idUser'))
             .then(response => {
                    console.log(response.data);
                    setAvatar(response.data.idUser.avatar)
                    setSaveKhoa(response.data.idFaculty._id)
                    setNameKhoa(response.data.idFaculty.name)
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
    },[])

    const updateDoctor = async () => {
        console.log(formData);
        axios.put(process.env.REACT_APP_API_URL+'/api/doctor/admin/update/' + localStorage.getItem('idUser'),formData)
        .then(response => {
            console.log(response.data);
            
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        })
        toast.success("Chỉnh sửa thành công")
    }
    function Change(){
        setShow(false)
        setShowEdit(true)
    }
    function BackChange(){
        setShow(true)
        setShowEdit(false)
    }
    return (
        <div style={{display:'flex'}}>
            <div>
                {/* <Image src={avatar} roundedCircle style={{objectFit: 'cover',width:'60%',height:'40%' }} /> */}
            </div>
            <div className='Edit__Doctor' style={{display: show ? 'block' : 'none' }}>
                <form onSubmit={updateDoctor}>
                    <div className='formflex' >
                            <div className="modalbody" >                           
                                <div className="form-group">
                                    <div className='form__info' style={{backgroundColor:'white'}}>
                                        <div className="title__info">
                                            <h5>Thông tin cá nhân</h5>
                                        </div>
                                        <div className="row"> 
                                            <div className="col">
                                                <label htmlFor="">Họ tên:</label>
                                                <input type="text" disabled  name ='fullname' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {fullname} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Nick name:</label>
                                                <input type="text" disabled name="nickname" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {nickname}  pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleNickName}/>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Description:</label>
                                                <input type="text" disabled name="description" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {description} pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleDes}/> 
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Avatar:</label>
                                                <input type="file" disabled ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                            </div>
                                        </div>
                                        <label htmlFor="">Địa chỉ:</label>
                                        <input type="text" name='address' disabled className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                        defaultValue = {address} required pattern="^(?!^\d+$)^.{5,}$" nChange = {handleAddress} />
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Phone number:</label>
                                                <input type="text" disabled name='phoneNumber' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {phoneNumber} disabled required pattern="^\+?(\d.*){3,}$" onChange = {handlePhone} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Email:</label>
                                                <input type="email" disabled name="email" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {mail} required onChange = {handleMail}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__info" style={{backgroundColor:'white'}}>
                                        <div className="title__info">
                                            <h5>Trình độ học vấn</h5>
                                        </div>
                                        <label htmlFor="">Chuyên khoa:</label>
                                        <select disabled className= 'form-control' name='idFaculty'  onChange={handleKhoa}>
                                            
                                            <option>{nameKhoa}</option>
                                            <option>-------------------------------------------------------------------</option>
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
                                                <input type="text" disabled  name='trainingPlaces' className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={trainingPlaces} required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"  onChange={handleNoiDaoTao}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">Bằng cấp:</label>
                                                <input type="text" disabled name="degree" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={degree} required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleBangCap}/>
                                            </div>
                                           
                                        </div>    
                                            <div className="modal-footer">
                                                <button onClick={Change} type='button' class="btn btn-primary">Đổi thông tin</button>
                                            </div>                  
                                    </div>
                                </div>  
                            </div>
                            {/* <div className='form__info' style={{backgroundColor:'white', height:'200px'}}>
                                        <div className="title__info">
                                            <h5>Tài khoản</h5>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <label htmlFor="">Username:</label>
                                                <input type="text" name="username" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={username} required pattern="^[a-z0-9_-]{3,16}$" onChange = {handleUserName}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">Mật khẩu:</label>
                                                <input type="text" name="password" className="form-control" placeholder="" aria-describedby="helpId" 
                                            defaultValue ={password} required onChange = {handlePassword} />
                                            </div>
                                        </div>   
                                        <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Cập nhật thông tin</button>
                            </div>      
                        </div> */}
                    </div>
                </form>
            </div>
            <div className='Edit__Doctor' style={{display: showEdit ? 'block' : 'none' }}>
                <form onSubmit={updateDoctor}>
                    <div className='formflex' >
                            <div className="modalbody" >                           
                                <div className="form-group">
                                    <div className='form__info' style={{backgroundColor:'white'}}>
                                        <div className="title__info">
                                            <h5>Thông tin cá nhân</h5>
                                        </div>
                                        <div className="row"> 
                                            <div className="col">
                                                <label htmlFor="">Họ tên:</label>
                                                <input type="text" name ='fullname' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {fullname} required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleNameBS}/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Nick name:</label>
                                                <input type="text" name="nickname" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {nickname}  pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleNickName}/>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Description:</label>
                                                <input type="text" name="description" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {description} pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleDes}/> 
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Avatar:</label>
                                                <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                            </div>
                                        </div>
                                        <label htmlFor="">Địa chỉ:</label>
                                        <input type="text" name='address'  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                        defaultValue = {address} required pattern="^(?!^\d+$)^.{5,}$" nChange = {handleAddress} />
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Phone number:</label>
                                                <input type="text" name='phoneNumber' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {phoneNumber} required pattern="^\+?(\d.*){3,}$" onChange = {handlePhone} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Email:</label>
                                                <input type="email" name="email" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {mail} required onChange = {handleMail}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__info" style={{backgroundColor:'white'}}>
                                        <div className="title__info">
                                            <h5>Trình độ học vấn</h5>
                                        </div>
                                        <label htmlFor="">Chuyên khoa:</label>
                                        <select className= 'form-control' name='idFaculty'  onChange={handleKhoa}>
                                            
                                            <option>{nameKhoa}</option>
                                            <option>-------------------------------------------------------------------</option>
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
                                                <input type="text"  name='trainingPlaces' className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={trainingPlaces} required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"  onChange={handleNoiDaoTao}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">Bằng cấp:</label>
                                                <input type="text" name="degree" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={degree} required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" onChange = {handleBangCap}/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <Button onClick={BackChange} type='button' variant='outline-secondary'>Trở về</Button>
                                            <Button type="submit" className="btn btn-primary">Cập nhật</Button>
                                        </div>                              
                                    </div>
                                </div>  
                            </div>
                            {/* <div className='form__info' style={{backgroundColor:'white', height:'200px'}}>
                                        <div className="title__info">
                                            <h5>Tài khoản</h5>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <label htmlFor="">Username:</label>
                                                <input type="text" name="username" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={username} required pattern="^[a-z0-9_-]{3,16}$" onChange = {handleUserName}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">Mật khẩu:</label>
                                                <input type="text" name="password" className="form-control" placeholder="" aria-describedby="helpId" 
                                            defaultValue ={password} required onChange = {handlePassword} />
                                            </div>
                                        </div>   
                                        <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Cập nhật thông tin</button>
                            </div>      
                        </div> */}
                    </div>
                </form>
            </div>
            
        </div>
    )
}
