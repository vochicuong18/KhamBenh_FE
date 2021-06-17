import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
import S3 from 'react-aws-s3';
function InforMember () {  
    let history = useHistory()
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
            ContentType :'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //<-- this is what you need!
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
    const [idRole] = useState('608d10b88057022ea4f4c2c6')
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
   
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/member/get/' + localStorage.getItem('idUser'))
             .then(response => {
                    setFullName(response.data.idUser.fullname)
                    setAddress(response.data.idUser.address)
                    setPhoneNumber(response.data.idUser.phoneNumber)
                    setMail(response.data.idUser.mail)
                    setUserName(response.data.idUser.idAccount.username)
                    setPassword(response.data.idUser.idAccount.password)
                    setAvatar(response.data.idUser.avatar)
             })
             .catch(function (error) {
                             
             }) 
            }         
        getAPI();
    },[])
        
    
    const updateMember = async (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put(process.env.REACT_APP_API_URL+'/api/member/admin/update/' +localStorage.getItem('idUser'), formData)
        .then(response => {
            history.go(0)
        
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
        toast.success("Chỉnh sửa thành công")
        // history.push("/admin-user")
        
    }


    return(
        <div>
            <div className="modal fade" id="infomember" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Thông tin bệnh nhân</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={updateMember}>
                        <div className="modal-body">                           
                            <div className="form-group ">
                                <div className='form__info'>
                                    <div className="title__info first__title">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="" required pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {fullname}
                                            onChange = {handleNameBS} />   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file"
                                            onChange ={handleClick}/>
                                        </div>
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text" required pattern="^(?!^\d+$)^.{5,}$" onChange = {handleAddress}  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    defaultValue = {address}
                                   />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {phoneNumber}
                                            onChange={handlePhone} required pattern="^\+?(\d.*){3,}$" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="email" required className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {mail}
                                            onChange ={handleMail} />
                                        </div>
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
export default InforMember;