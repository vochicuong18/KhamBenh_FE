import React, {useRef, useState} from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../../yupGlobal'
import { Form} from 'react-bootstrap';
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
    const [avatar, setAvatar] = useState('https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/user.png')
    const [idRole] = useState('608d70c9c7b4fa2708e30e6a')
    const addMember = async (data) =>{
        const formData={
            username:data.username,
            password:data.password,
            mail:data.email,
            fullname :data.fullName,
            phone:data.phone,
            address:data.address,
            avatar:avatar,
            idRole:idRole,
        }
        axios.post(process.env.REACT_APP_API_URL+'/api/member/admin/create', formData)
        .then(response => {
            toast.success('Th??m th??nh c??ng')
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
        window.location.reload()
     }
     const schema = yup.object().shape({
        username: yup.string().required('*Vui l??ng kh??ng ????? tr???ng').username('*Username kh??ng c?? k?? t??? ?????t bi???t, ph???i t??? 3 ?????n 16 k?? t???'),
        password: yup.string().required('*Vui l??ng kh??ng ????? tr???ng'),
        phoneNumber: yup.string().required('Vui l??ng kh??ng b??? tr???ng').phone('*Sai ?????ng d???ng s??? ??i???n tho???i'),
        fullName :yup.string().required('*Vui l??ng kh??ng ????? tr???ng').fullName('*Sai ?????nh d???ng t??n'),
        address:yup.string().required('*Vui l??ng kh??ng ????? tr???ng').address('*Sai ?????nh d???ng ?????a ch???'),
        email:yup.string().required('*Vui l??ng kh??ng ????? tr???ng').email('*Sai ?????nh d???ng email')
        
      })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    return(
        <Form onSubmit={handleSubmit(addMember)} >
        <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel">????ng k?? ngay</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
               <div>
               <div className="modal-body">                           
                        <div className="form-group ">
                        <div className='form__info'>
                                <div className="title__info">
                                    <h5>T??i kho???n</h5>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="">Username:</label>
                                        <input type="text" name="username" className="form-control" placeholder="" aria-describedby="helpId"
                                      {...register('username', { required: true })}/>
                                    {errors.username && <p className="error">{errors.username.message}</p>}
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="">M???t kh???u:</label>
                                        <input type="text" name='password' className="form-control" placeholder="" aria-describedby="helpId" 
                                     {...register('password', { required: true })} />
                                     {errors.password && <p className="error">{errors.password.message}</p>}
                                    </div>
                                </div>              
                            </div>
                            <div className='form__info'>
                                <div className="title__info first__title">
                                    <h5>Th??ng tin c?? nh??n</h5>
                                </div>
                                <div className="row"> 
                                    <div className="col">
                                        <label htmlFor="">H??? t??n:</label>
                                        <input type="text" name='fullName' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                          {...register('fullName', { required: true })} />
                                        {errors.fullName && <p className="error">{errors.fullName.message}</p>}   
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="">Avatar:</label>
                                        <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                    </div>
                                   
                                </div>
                                <label htmlFor="">?????a ch???:</label>
                                <input type="text" name='address' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                              {...register('address', { required: true })} />
                                {errors.address && <p className="error">{errors.address.message}</p>}
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Phone number:</label>
                                        <input type="text" name='phoneNumber' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                       {...register('phoneNumber', { required: true })} />
                                      {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Email:</label>
                                        <input type="text" name='email' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                     {...register('email', { required: true })} />
                                      {errors.email && <p className="error">{errors.email.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                        <button type="submit" className="btn btn-primary">L??u</button>
                    </div>
              
               </div>
            </div>
            </div>
        </div>
        </Form> 
        )
}
export default Modal_AddUser;
