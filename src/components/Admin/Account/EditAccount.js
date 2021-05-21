import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

function EditUser (props) {  
    const id = props.match.params._id
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole] = useState([])
    const [idRole,setIdRole] = useState('')
    toast.configure({
        autoClose: 2000,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })   
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/role/get')
            .then((response) => {
                setRole(response.data);
                return response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])

    function handleUserName(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handlePassword(e){
        e.preventDefault()
        setPassword(e.target.value)
    }
    function handleRole(e){
        e.preventDefault()
        setIdRole(e.target.value)
    }

    const formData = {
        username:username,
        password:password,
        idRole:idRole,
    }

    useEffect(() => {
        async function getAPI(props){
             await axios.get(process.env.REACT_APP_API_URL+'/api/account/get/' + id)
             .then(response => {
                 console.log(response.data);
                    setUserName(response.data.username)
                    setPassword(response.data.password)
             })
             .catch(function (error) {
                 console.log(error);              
             }) 
            }         
        getAPI();
    },[id])
        
    
    const updateAccount = async () => {
        console.log(formData);
        axios.put(process.env.REACT_APP_API_URL+'/api/account/update/' +id, formData)
        .then(response => {
            toast.success("Chỉnh sửa thành công")
            props.history.push('/admin-user')
        })

        .catch((err) => {
            toast.error(err.response.data.message)
        })
        
    }


    return(
        <div>
             <div className="" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Thông tin tài khoản</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">                           
                            <div className="form-group ">
                                <select className= 'form-control' onChange = {handleRole} > 
                                    <option>Loại tài khoản</option>
                                    {role.map((item) => (
                                        
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Tài khoản</h5>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="">Username:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            defaultValue ={username}
                                            onChange = {handleUserName}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Mật khẩu:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                            defaultValue = {password}
                                            onChange = {handlePassword}/>
                                        </div>
                                    </div>              
                                </div>
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" onClick={updateAccount} className="btn btn-primary">Lưu</button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>
    );            
}
export default EditUser;