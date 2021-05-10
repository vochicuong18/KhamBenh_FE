import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
console.log('a');

function EditDiagnosis (props) {  
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })   
    const id = props.match.params._id
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

    const [idFaculty, setKhoa] = useState([])
    const [savekhoa, setSaveKhoa] = useState('')
    const [name, setName] = useState('')
    const [symptom,setSymtom] = useState([])
    const [description , setDescription] = useState('')
    
    function handleName(e){
        e.preventDefault();
        setName(e.target.value)
    }
    function handleKhoa (e){
        e.preventDefault()
        setSaveKhoa(e.target.value)
    }
   
    function handleDes(e){
        e.preventDefault()
        setDescription(e.target.value)
    }
    const formData = {
        name: name,
        idFaculty:savekhoa,
        description:description,
       
    }
   
    useEffect(() => {
        async function getAPI(props){
             await axios.get('http://localhost:9000/api/diagnostic/get/' + id)
             .then(response => {
                    console.log(response.data);
                    setName(response.data.name)
                    setDescription(response.data.description)
                    setSymtom(response.data.symptom)
             })
             .catch(function (error) {
                 console.log(error);              
             }) 
            }         
        getAPI();
    },[id])
        
    
    const updateDoctor = async () => {
        console.log(formData);
        axios.put('http://localhost:9000/api/diagnostic/update/' + id, formData)
        .then(response => {
            toast.success("Chỉnh sửa thành công")
            props.history.push('/admin-chandoan')
        })

        .catch((err) => {
            toast.error(err.response.data.message)
        })
        
    }
    return (
        <div>
            <div className="" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Cập nhật thông tin</h3>
                        </div>
                    <form >
                        <div className="modalbody">                           
                            <div className="form-group">
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Thông tin bệnh</h5>
                                    </div>
                                        <label htmlFor="">Tên bệnh:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {name} onChange={handleName}/>   
                                        <br/>

                                        <label htmlFor="">Description:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {description} onChange = {handleDes}/>   
                                        <br/>
                                        <label htmlFor="">Triệu chứng:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50} disabled
                                            defaultValue = {symptom}/>   
                                        <br/>
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
export default EditDiagnosis;