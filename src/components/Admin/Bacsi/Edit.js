import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import S3 from 'react-aws-s3';
import {useHistory} from 'react-router-dom'
function Edit (props) {
    const history = useHistory();
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
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/' + props.match.params._id)
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
    },[props.match.params._id])

    const updateDoctor = async (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_URL+'/api/doctor/admin/update/' + props.match.params._id,formData)
        .then(response => {
            props.history.push("/admin-doctor")
            toast.success("Ch???nh s???a th??nh c??ng")
            // window.location.reload()
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        })
        
    }
    function cancel(){
        history.push("/admin-doctor")
    }          
    return (
        <div className="">
            <div className="" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">C???p nh???t th??ng tin b??c s??</h3>
                        </div>
                    <form onSubmit={updateDoctor}>
                        <div className="modalbody">                           
                            <div className="form-group">
                                <div className='form__info'>
                                <div className="title__info">
                                            <h5>Th??ng tin c?? nh??n</h5>
                                        </div>
                                        <div className="row"> 
                                            <div className="col">
                                                <label htmlFor="">H??? t??n:</label>
                                                <input type="text" name ='fullname' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {fullname} required pattern="^[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s\W|_]+$" onChange = {handleNameBS}/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Nick name:</label>
                                                <input type="text" name="nickname" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {nickname}  pattern="^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$" onChange = {handleNickName}/>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="">Description:</label>
                                                <input type="text" name="description" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                                defaultValue = {description} pattern="^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$" onChange = {handleDes}/> 
                                            </div>
                                            <div className="col">
                                                <label htmlFor="">Avatar:</label>
                                                <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                            </div>
                                        </div>
                                        <label htmlFor="">?????a ch???:</label>
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
                                <div className="form__info">
                                <div className="title__info">
                                            <h5>Tr??nh ????? h???c v???n</h5>
                                        </div>
                                        <label htmlFor="">Chuy??n khoa:</label>
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
                                                <label htmlFor="">N??i ????o t???o:</label>
                                                <input type="text"  name='trainingPlaces' className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={trainingPlaces} required pattern="^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$"  onChange={handleNoiDaoTao}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">B???ng c???p:</label>
                                                <input type="text" name="degree" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={degree} required pattern="^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$" onChange = {handleBangCap}/>
                                            </div>
                                    </div>                             
                                </div>
                                <div className='form__info'>
                                <div className="title__info">
                                    <h5>T??i kho???n</h5>
                                </div>
                                <div className='row'>
                                <div className='col'>
                                                <label htmlFor="">Username:</label>
                                                <input type="text" name="username" className="form-control" placeholder="" aria-describedby="helpId"
                                                defaultValue={username} required pattern="^[a-z0-9_-]{3,16}$" onChange = {handleUserName}/>
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="">M???t kh???u:</label>
                                                <input type="text" name="password" className="form-control" placeholder="" aria-describedby="helpId" 
                                            defaultValue ={password} required onChange = {handlePassword} />
                                            </div>
                                </div>         
                                </div>
                                            
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={cancel} className="btn btn-secondary" data-dismiss="modal">????ng</button>
                            <button type="submit" className="btn btn-primary">L??u</button>
                        </div>
                    </form>  
                    </div>
                </div>
            </div>
        </div>
    )
                    
}
export default Edit;