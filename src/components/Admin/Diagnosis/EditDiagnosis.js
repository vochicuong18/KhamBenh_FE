import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {  

      state = {
        name: '',
        description:'',
        symptom:'',
        faculty: '',
    }
    
    componentDidMount() {
        axios.get('http://113.173.154.51:9000/api/diagnostic/get/608fa71c6657343f087a1f1b')
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    symptom: response.data.symptom,
                    faculty: response.data.faculty
                });
            })
            .catch(function (error) {
                console.log(error);              
            })          
    }

    handleChangeName = event => {
        this.setState({name:event.target.value})
    }
    handleChangeFaculty = event => {
        this.setState({faculty:event.target.value})
    }

    handleSubmit = event =>{
        event.preventDefault(); 
        const obj ={
            name: this.state.name,
            description:this.state.description,
            symptom:this.state.symptom,
            faculty:this.state.faculty
            
        }
        axios.put('http://113.173.154.51:9000/api/diagnostic/update/'+ this.props.match.params._id, obj)
            .then(res => {console.log(res.data)});
            this.props.history.push('/admin-khoa');
            window.location.reload()
    
    }
    return = event => {
        event.preventDefault();
        this.props.history.push('/admin-khoa');
    }

    render() {             
        return (
            <div>
               <div className="" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông tin khoa</h5>      
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">                           
                                <div className="form-group">
                                    <label htmlFor="">Tên:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50} defaultValue={this.state.name} onChange={this.handleChangeName}/>
                                    <label htmlFor="">Description:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.description} onChange={this.handleChangeDes}/>
                                    <label htmlFor="">Sympton:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.symptom} onChange={this.handleChangeDes}/>
                                    <label htmlFor="">Khoa:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.faculty} onChange={this.handleChangeDes}/>

                                </div>  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.return}>Đóng</button>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </form>  
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}