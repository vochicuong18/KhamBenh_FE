import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

import S3 from 'react-aws-s3';
function EditUser (props) {  
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
   
    useEffect(() => {
        async function getAPI(props){
             await axios.get(process.env.REACT_APP_API_URL+'/api/member/get/' + id)
             .then(response => {
                 console.log(response.data);
                    setFullName(response.data.idUser.fullname)
                    setAddress(response.data.idUser.address)
                    setPhoneNumber(response.data.idUser.phoneNumber)
                    setMail(response.data.idUser.mail)
                    setUserName(response.data.idUser.idAccount.username)
                    setPassword(response.data.idUser.idAccount.password)
             })
             .catch(function (error) {
                 console.log(error);              
             }) 
            }         
        getAPI();
    },[id])
        
    
    const updateDoctor = async () => {
        console.log(formData);
        axios.put(process.env.REACT_APP_API_URL+'/api/member/admin/update/' +id, formData)
        .then(response => {
            toast.success("Ch???nh s???a th??nh c??ng")
            props.history.push('/admin-user')
        })

        .catch((err) => {
            toast.error(err.response.data.message)
        })
        
    }


    return(
        <div>
            <div className="" id="updateUser" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Th??ng tin b???nh nh??n</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">                           
                            <div className="form-group ">
                                <div className='form__info'>
                                    <div className="title__info first__title">
                                        <h5>Th??ng tin c?? nh??n</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">H??? t??n:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {fullname}
                                            onChange = {handleNameBS} />   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file"
                                            onChange ={handleClick}/>
                                        </div>
                                    </div>
                                    <label htmlFor="">?????a ch???:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    defaultValue = {address}
                                    onChange = {handleAddress} />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {phoneNumber}
                                            onChange={handlePhone} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {mail}
                                            onChange ={handleMail} />
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
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            defaultValue = {username}
                                            onChange = {handleUserName}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">M???t kh???u:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                            defaultValue = {password}
                                            onChange = {handlePassword}/>
                                        </div>
                                    </div>              
                                </div>
                                     
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                            <button type="button" onClick = {updateDoctor} className="btn btn-primary">L??u</button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>
    );            
}
export default EditUser;