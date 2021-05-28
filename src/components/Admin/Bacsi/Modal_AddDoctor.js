import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../../yupGlobal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Modal_AddDoctor() {
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

    const [avatar, setAvatar] = useState('https://imagebucketkhambenhonl-1.s3-ap-southeast-1.amazonaws.com/user.png')
    const [idFaculty, setKhoa] = useState([])
    const [idRole] = useState('608d10b88057022ea4f4c2c6')
   
    const addDoctor = async (data) =>{
        const formData = {
            fullname:data.fullname,
            avatar:avatar,
            nickname:data.nickname,
            address:data.address,
            phoneNumber:data.phoneNumber,
            mail:data.mail,
            idFaculty:data.idFaculty,
            username:data.username,
            password:data.password,
            degree:data.degree,
            trainingPlaces:data.trainingPlaces,
            description:data.description,
            idRole:idRole,
        }
        axios.post(process.env.REACT_APP_API_URL+'/api/doctor/admin/create', formData)
        .then(response => {
            toast.success('Thêm thành công')
            window.location.reload()
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
     }
     const schema = yup.object().shape({
        username: yup.string().required('*Vui lòng không để trống').username('*Username không có kí tự đặt biệt, phải từ 3 đến 16 kí tự'),
        password: yup.string().required('*Vui lòng không để trống'),
        phoneNumber: yup.string().phone('*Sai địng dạng số điện thoại'),
        fullname :yup.string().required('*Vui lòng không để trống').fullName('*Sai định dạng tên'),
        address:yup.string().required('*Vui lòng không để trống').address('*Sai định dạng địa chỉ'),
        email:yup.string().required('*Vui lòng không để trống').email('*Sai định dạng email'),
        trainingPlaces:yup.string().required('*Vui lòng không để trống').trainingPlaces('*Sai định dạng nơi đào tạo'),
        degree:yup.string().required('*Vui lòng không để trống').degree('*Sai địng dạng bằng cấp'),
        idFaculty:yup.string().required('Vui lòng chọn khoa'),
        nickname:yup.string().degree('*Sai địng dạng nickname'),
        description:yup.string().degree('Sai định dạng mô tả')
      })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
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
                    <form onSubmit={handleSubmit(addDoctor)}>
                        <div className="modal-body">                           
                            <div className="form-group ">
                                <div className='form__info'>
                                    <div className="title__info first__title">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" name='fullname' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            {...register('fullname', { required: true })} />
                                            {errors.fullname && <p className="error">{errors.fullname.message}</p>} 
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Nick name:</label>
                                            <input type="text" name='nickname' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            {...register('nickname', { required: true })} />
                                            {errors.nickname && <p className="error">{errors.nickname.message}</p>} 
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Mô tả:</label>
                                            <input type="text" name="description" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            {...register('description', { required: true })} />
                                            {errors.description && <p className="error">{errors.description.message}</p>} 
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                        </div>
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
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
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Trình độ học vấn</h5>
                                    </div>
                                    <label htmlFor="">Chuyên khoa:</label>
                                    <select className= 'form-control' name='idFaculty'  {...register('idFaculty', { required: true })} >
                                          {errors.idFaculty && <p className="error">{errors.idFaculty.message}</p>}
                                        <option>Chọn khoa</option>
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
                                            <input type="text" name='trainingPlaces' className="form-control" placeholder="" aria-describedby="helpId"
                                             {...register('trainingPlaces', { required: true })} />
                                             {errors.trainingPlaces && <p className="error">{errors.trainingPlaces.message}</p>}
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Bằng cấp:</label>
                                            <input type="text" name='degree' className="form-control" placeholder="" aria-describedby="helpId"
                                             {...register('degree', { required: true })} />
                                             {errors.degree && <p className="error">{errors.degree.message}</p>} 
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
                                            <input type="text" name='username' className="form-control" placeholder="" aria-describedby="helpId"
                                            {...register('username', { required: true })}/>
                                            {errors.username && <p className="error">{errors.username.message}</p>}
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Mật khẩu:</label>
                                            <input type="text" name='password' className="form-control" placeholder="" aria-describedby="helpId" 
                                              {...register('password', { required: true })}/>
                                              {errors.password && <p className="error">{errors.password.message}</p>}
                                        </div>
                                    </div>              
                                </div>
                                     
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="submit"  className="btn btn-primary">Lưu</button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>
    );
    
}
export default Modal_AddDoctor;
