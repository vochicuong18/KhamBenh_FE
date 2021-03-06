import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'
function EditDiagnosis (props) {  
    let history = useHistory()
    const [idFaculty, setKhoa] = useState([])
    const [savekhoa, setSaveKhoa] = useState('')
    const [name, setName] = useState('')
    const [symptom,setSymtom] = useState([])
    const [description , setDescription] = useState('')
    function handleSymptom(e) {
        const string = (e.target.value);
        const array = string.split(', ');
        setSymtom(array)
    }
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })   
    const id = props.match.params._id
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
    useEffect(() => {
        async function getAPI(props){
             await axios.get(process.env.REACT_APP_API_URL+'/api/diagnostic/get/' + id)
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
        console.log(symptom)
        const formData = {
            symptom: symptom,
            name: name,
            idFaculty:savekhoa,
            description:description,
        }
        console.log(formData);
        axios.put(process.env.REACT_APP_API_URL+'/api/diagnostic/update/' + id, formData)
        .then(response => {
            toast.success("Ch???nh s???a th??nh c??ng")
            console.log(response.data);
            props.history.push('/admin-chandoan')
        })

        .catch((err) => {
            toast.error(err.response.data.message)
        })
    }
    function returnPage(){
        history.push('/admin-chandoan');
    }
    return (
        <div>
            <div className="" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">C???p nh???t th??ng tin</h3>
                        </div>
                    <form>
                        <div className="modalbody">                           
                            <div className="form-group">
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Th??ng tin b???nh</h5>
                                    </div>
                                        <label htmlFor="">T??n b???nh:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={150}
                                            defaultValue = {name} onChange={handleName}/>   
                                        <br/>

                                        <label htmlFor="">Description:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {description} onChange = {handleDes}/>   
                                        <br/>
                                        <label htmlFor="">Tri???u ch???ng:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {symptom} onChange={handleSymptom}/>   
                                        <br/>
                                        <label htmlFor="">Chuy??n khoa:</label>
                                        <select className= 'form-control' onChange={handleKhoa}>
                                            <option>Ch???n chuy??n khoa</option>
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
                            <button type="button" onClick={returnPage} className="btn btn-secondary" data-dismiss="modal">????ng</button>
                            <button type="button" onClick={updateDoctor} className="btn btn-primary">L??u</button>
                        </div>
                    </form>  
                    </div>
                </div>
            </div>
        </div>
    )
                    
}
export default EditDiagnosis;