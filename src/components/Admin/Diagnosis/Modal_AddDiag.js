import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../../yupGlobal'
import { Form} from 'react-bootstrap';
function ImportExcel() {
    const [idFaculty, setKhoa] = useState([])
    const [symptom,setSymtom] = useState('')
    function handleSymptom(e) {
        const string = (e.target.value);
        const array = string.split(', ');
        setSymtom(array)
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

    const addDiagnosis = async(data) => {
        const formData = {
            symptom: symptom,
            name:data.name,
            description: data.description,
            idFaculty:data.idFaculty
        }
        console.log(formData);
        axios.post(process.env.REACT_APP_API_URL+'/api/diagnostic/admin/create',formData)
        .then(response => {
            console.log('thêm thành công');
        })

        .catch((err) => {
            console.log(err.response.data.message);
            toast.error(err.response.data.message)
        })
    }
    const schema = yup.object().shape({
        name: yup.string().required('*Vui lòng không để trống').fullName('*Sai định dạng triệu chứng'),
        description:yup.string().degree('Sai định dạng mô tả'),
        idFaculty:yup.string().required('Vui lòng chọn khoa'),
      })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    return(
        <Form onSubmit={handleSubmit(addDiagnosis)} >
        <div className="modal fade" id="diagnosis" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel">Thêm triệu chứng</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
               <div>
               <div className="modal-body">                           
                        <div className="form-group ">
                            <div className='form__info'>
                                <div className="row"> 
                                    <div className="col">
                                        <label htmlFor="">Triệu chứng:</label>
                                        <input type="text" name='symptom' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50} onChange={handleSymptom}/>
                                         
                                    </div>
                                </div>
                                <label htmlFor="">Tên bệnh:</label>
                                <input type="text" name='name' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                              {...register('name', { required: true })} />
                                {errors.name && <p className="error">{errors.name.message}</p>}
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Mô tả:</label>
                                        <input type="text" name='description' className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                       {...register('description', { required: true })} />
                                      {errors.description && <p className="error">{errors.description.message}</p>}
                                    </div>
                                    <div className="col">
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
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </div>
              
               </div>
            </div>
            </div>
        </div>
        </Form> 
    );
    
}
export default ImportExcel;
