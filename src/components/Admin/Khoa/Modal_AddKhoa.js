import React, {useRef,useState } from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';

function Modal_AddKhoa (props) {
    const fileInput= useRef();
    function handleClick(event) {
        event.preventDefault();
        let file = fileInput.current.files[0]
        let newFileName  = fileInput.current.files[0].name
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
                setLogo(data.location)
            }else {
                console.log('fail');
            }
        })
        
    }
    const [name, setName] = useState('')
    const [description,setDescription] = useState('');
    const [logo ,setLogo] = useState('');

    function handleName (e){
        setName(e.target.value)
    }
    function handleDes (e){
        setDescription(e.target.value)
    }
    const formData =   {
        name: name,
        description: description,
        logo: logo,
    }
    
    const add = async () => {
        // await axios.post('http://113.173.154.51:9000/api/faculty/create', formData)
        axios.post(process.env.REACT_APP_API_URL+'/api/faculty/create', formData)
        .then(response =>{
            console.log(response.formData)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return(
        <div>
            <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thông tin khoa</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={add}>
                        <div className="modal-body">                           
                            <div className="form-group">
                                <label htmlFor="">Tên khoa:</label>
                                <input type="text" name = "name" className="form-control" placeholder="" aria-describedby="helpId" maxLength =  {50} onChange = {handleName}/>
                                <label htmlFor="">Description:</label>
                                <input type="text" name = "description"  className="form-control" placeholder="" aria-describedby="helpId" onChange = {handleDes} />
                                <label htmlFor="">Logo:</label>
                                <input type="file" ref={fileInput} className="form-control" crossOrigin="anonymous" onChange={handleClick}/>
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
    );
}

export default Modal_AddKhoa;

