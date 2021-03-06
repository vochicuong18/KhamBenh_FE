import React, { Component } from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';


export default class Edit extends Component {  
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.fileInput= React.createRef();
    }
    state = {
        name: '',
        chuyenkhoa: '',
        noidaotao:'',
        bangcap: ''
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
               this.setState({logo:data.location})
            }else {
                console.log('fail');
            }
        })
        
    }
    state = {
        name: '',
        chuyenkhoa: '',
        price:'',
        description: ''
    }
    componentDidMount() {
        
        axios.get(process.env.REACT_APP_API_URL+'/api/faculty/get/'+ this.props.match.params._id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    price:response.data.price,
                    logo: response.data.logo
                    
                });
            })
            .catch(function (error) {
                console.log(error);              
            })          
    }

    handleChangeName = event => {
        this.setState({name:event.target.value})
    }
    handleChangeDes = event => {
        this.setState({description:event.target.value})
    }
    handleChangePrice = event => {
        this.setState({price:event.target.value})
    }

    handleSubmit = event =>{
        event.preventDefault(); 
        const obj ={
            name: this.state.name,
            description:this.state.description,
            price: this.state.price,
            logo:this.state.logo
            
        }
        axios.put(process.env.REACT_APP_API_URL+'/api/faculty/update/'+ this.props.match.params._id, obj)
        .then(response => {
            this.props.history.push("/admin-khoa")
            alert("Ch???nh s???a th??nh c??ng")
        })
         .catch((err) => {
            alert(err.response.data.message)
        })
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
                            <h5 className="modal-title" id="exampleModalLabel">Th??ng tin khoa</h5>      
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">                           
                                <div className="form-group">
                                    <label htmlFor="">H??? t??n:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" maxLength ={50} defaultValue={this.state.name} onChange={this.handleChangeName}/>
                                    <label htmlFor="">Description:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.description} onChange={this.handleChangeDes}/>
                                    <label htmlFor="">Logo:</label>
                                    <input type="file" name="" className="form-control" placeholder="" aria-describedby="helpId" onChange={this.handleClick}/>
                                    <label htmlFor="">Gi?? kh??m:</label>
                                    <input type="text" name="" className="form-control" placeholder="" aria-describedby="helpId" defaultValue={this.state.price} onChange={this.handleChangePrice}/>
                                
                                </div>  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.return}>????ng</button>
                                <button type="submit" className="btn btn-primary">L??u</button>
                            </div>
                        </form>  
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}