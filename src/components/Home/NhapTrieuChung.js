import React,{ useState } from 'react';
import {useHistory} from "react-router-dom"
import {FormControl, Button,InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { toast } from 'react-toastify';
function FrmNhapTC() {
  toast.configure({
    autoClose: 2000,
    draggable: true,
    position: toast.POSITION.TOP_RIGHT
})  
  let history = useHistory()
  const[symptom,setSymtom] = useState('')
  function handleChangeTC(event){
    setSymtom(event.target.value)
  }
  const formData = {
    symptom:symptom
  }
  const Chuandoan = async () =>{
    console.log(formData);
    axios.post('http://localhost:9000/api/diagnostic/searchdiagnostic', formData)
    .then(res =>{
      console.log(res.data)
       if(res.data.message){
           toast.error(res.data.message)

       }else{
         localStorage.setItem('Name',res.data.name)
         localStorage.setItem('Khoa',res.data.idFaculty.name)
         localStorage.setItem('bookFac',res.data.idFaculty._id)
         history.push("/result")
       }
    })
    .catch((err) => {
        toast.error(err.response.data.message)
    })
 }
    return (
      <div data-aos="fade-up">
          <div className='wapper_feel'>
            <div>
              <h3 className='title'>Hôm nay bạn có khỏe không?</h3>
              <p>Cho chúng tôi biết những vấn đề của bạn</p>
            </div>
            <div>
              <form>
              <InputGroup className='mb-3' >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAmbulance} />
                </InputGroup.Text>
                </InputGroup.Prepend>
              <FormControl 
                aria-label="trieuchung"
                aria-describedby="basic-addon1"
                onChange={handleChangeTC}
              />
                            
              {/* <Button type="submit" className='btn__chandoan'>Chẩn đoán</Button> */}
              {/* <input type="text" className="form-control"  onChange = {this.handleChangeTC}/> */}
              <Button onClick = {Chuandoan} className='btn__chandoan'>Chẩn đoán</Button>
              </InputGroup>
              </form>
             
            </div>
          </div>
      </div>
    )
}

export default FrmNhapTC;
