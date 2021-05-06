import React, { Component } from 'react';
import axios from 'axios';
export default class Edit extends Component {     
    state = {
        name: '',
        chuyenkhoa: '',
        noidaotao:'',
        bangcap: ''
    }
    componentDidMount() {
        axios.get('http://localhost:3000/api/bacsi/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    chuyenkhoa: response.data.chuyenkhoa,
                    noidaotao: response.data.noidaotao,
                    bangcap: response.data.bangcap
                });
            })
            .catch(function (error) {
                console.log(error);              
            })          
    }

    handleChangeName = event => {
        this.setState({name:event.target.value})
    }
    handleChangeCK = event => {
        this.setState({chuyenkhoa:event.target.value})
    }
    handleChangeNDT = event => {
        this.setState({noidaotao:event.target.value})
    }
    handleChangeBC = event => {
        this.setState({bangcap:event.target.value})
    }
    handleSubmit = event =>{
        event.preventDefault(); 
        const obj ={
            name: this.state.name,
            chuyenkhoa:this.state.chuyenkhoa,
            noidaotao:this.state.noidaotao,
            bangcap:this.state.bangcap
        }
        axios.put('http://localhost:3000/api/bacsi/'+ this.props.match.params.id, obj)
            .then(res => {console.log(res.data)});
            this.props.history.push('/admin');
    
    }

    render() {             
        return (
            <div>
               <div className="" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông tin bác sĩ</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">                           
                                <div className="form-group">
                                    <label htmlFor="">Họ tên:</label>
                                    <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50} defaultValue={this.state.name} onChange={this.handleChangeName}/>
                                    <label htmlFor="">Chuyên khoa:</label>
                                    <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.chuyenkhoa} onChange={this.handleChangeCK}/>
                                
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="">Nơi đào tạo:</label>
                                            <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.noidaotao} onChange={this.handleChangeNDT}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Bằng cấp:</label>
                                            <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.bangcap} onChange={this.handleChangeBC}/>
                                        </div>
                                    </div>                               
                                    <label htmlFor="">Avatar:</label>
                                    <input type="file" name="" id="" className="form-control-file"></input>
                                </div>  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
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