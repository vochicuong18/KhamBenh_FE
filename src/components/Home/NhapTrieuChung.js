import React,{ Component } from 'react';
import {FormControl, Button,InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
class frmDatLich extends Component {
  state = {
    symptom:''
  }
  handleChangeTC = event => {
    this.setState({symptom:event.target.value})
    
  }
  
  handleSubmit = event =>{
    event.preventDefault(); 
    const obj ={
      symptom: this.state.symptom
    }
    axios.post('http://localhost:9000/api/diagnostic/searchdiagnostic', obj)
    .then(res =>{
         console.log(res.data)
          if(res.data.message){
              alert(res.data.message)
          }else{
            localStorage.setItem('Name',res.data.name)
            // localStorage.setItem('Khoa',res.data.idFaculty.name)
            // window.location ='/result'
          }
     })
     .catch()

     this.setState({
        symptom: this.state.symptom
     });
     console.log(this.state.symptom);

 }
  render () {
    return (
      <div data-aos="fade-up">
          <div className='wapper_feel'>
            <div>
              <h3 className='title'>Hôm nay bạn có khỏe không?</h3>
              <p>Cho chúng tôi biết những vấn đề của bạn</p>
            </div>
            <div>
              <form onSubmit = {this.handleSubmit}>
              <InputGroup className='mb-3' >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAmbulance} />
                </InputGroup.Text>
                </InputGroup.Prepend>
              <FormControl 
                aria-label="trieuchung"
                aria-describedby="basic-addon1"
                onChange={this.handleChangeTC}
              />
                            
              {/* <Button type="submit" className='btn__chandoan'>Chẩn đoán</Button> */}
              {/* <input type="text" className="form-control"  onChange = {this.handleChangeTC}/> */}
              <Button type="submit" className='btn__chandoan'>Chẩn đoán</Button>
              </InputGroup>
              </form>
             
            </div>
          </div>
      </div>
    )
  };
}

export default frmDatLich;
