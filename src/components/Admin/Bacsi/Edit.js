import React, { Component } from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';
export default class Edit extends Component {     
    constructor(props) {
        super(props);
        this.idFaculty = [];
        this.myRef = React.createRef();
        this.fileInput= React.createRef();
    }
    state = {
        fullname:'',
        avatar:'',
        nickname:'',
        address:'',
        phoneNumber:'',
        mail:'',
        idFaculty:[],
        username:'',
        password:'',
        degree:'',
        trainingPlaces:'',
        description:'',
        idRole:'',
    }
    handleClick = event =>{
        console.log(event.target.files[0])
        event.preventDefault();
        let file = event.target.files[0]
        let newFileName  = event.target.files[0].name
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
                console.log('success');
                console.log(data.location)
               this.setState({avatar:data.location})
            }else {
                console.log('fail');
            }
        })
        
    }
    getDataDropDown(){
        axios.get('http://localhost:9000/api/faculty/get')
        .then((response) => {
            this.setState({idFaculty:response.data});
            return response.data
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    componentDidMount() {
        console.log('aaaaaa');
        axios.get('http://localhost:9000/api/doctor/get/'+ this.props.match.params._id)
            .then(response => {
                console.log(response.data[0].idAccount.username)
                console.log();
                this.setState({
                    fullname:response.data[0].fullname,
                    avatar:response.data[0].avatar,
                    nickname:response.data[0].nickname,
                    address:response.data[0].address,
                    phoneNumber:response.data[0].phoneNumber,
                    mail:response.data[0].mail,
                    idFaculty:response.data[0].idFaculty,
                    username:response.data[0].idAccount.username,
                    password:response.data[0].idAccount.password,
                    degree:response.data[0].degree,
                    trainingPlaces:response.data[0].trainingPlaces,
                    description:response.data[0].description,
                    idRole:response.data[0].idRole,
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
            fullname:this.state.fullname,
            avatar:this.state.avatar,
            nickname:this.state.nickname,
            address:this.state.address,
            phoneNumber:this.state.phoneNumber,
            mail:this.state.mail,
            idFaculty:this.state.idFaculty,
            username:this.state.username,
            password:this.state.password,
            degree:this.state.degree,
            trainingPlaces:this.state.trainingPlaces,
            description:this.state.description,
            idRole:this.state.idRole,
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
                            <h3 className="modal-title" id="exampleModalLabel">Cập nhật thông tin bác sĩ</h3>
                        </div>
                    <form>
                        <div className="modalbody">                           
                            <div className="form-group">
                                <div className='form__info'>
                                    <div className="title__info">
                                        <h5>Thông tin cá nhân</h5>
                                    </div>
                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="">Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {this.state.fullname} />   
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Nick name:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {this.state.nickname} />   
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Description:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue = {this.state.description} />   
                                        </div>
                                        {/* <div className="col">
                                            <label htmlFor="">Avatar:</label>
                                            <input type="file"  ref={fileInput} className="form-control-file" onChange ={handleClick}/>
                                        </div> */}
                                    </div>
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input type="text"  className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                    defaultValue = {this.state.address} />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Phone number:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue={this.state.phoneNumber} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50}
                                            defaultValue ={this.state.mail} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form__info">
                                    <div className="title__info">
                                        <h5>Trình độ học vấn</h5>
                                    </div>
                                    <label htmlFor="">Chuyên khoa:</label>
                                    <select className= 'form-control'> 
                                        {this.state.idFaculty.map((item) => (
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
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            defaultValue={this.state.trainingPlaces}/>
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="">Bằng cấp:</label>
                                            <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                            defaultValue={this.state.degree} />
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
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId"
                                        defaultValue = {this.state.username}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="">Mật khẩu:</label>
                                        <input type="text" className="form-control" placeholder="" aria-describedby="helpId" 
                                        defaultValue = {this.state.password}/>
                                    </div>
                                </div>         
                                </div>
                                          
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