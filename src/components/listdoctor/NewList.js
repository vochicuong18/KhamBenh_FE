import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import {Form} from 'react-bootstrap'
import Header from '../Default/Header'
import TitleDoc from '../listdoctor/titlelist'
export default function NewList() {
    const [listDoctor,setListDoctor] = useState([])
    const [keyword,setKeyword] = useState('')
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get/')
            .then((response) => {
                console.log(response.data)
                setListDoctor(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    return (
        <div>
            <Header/>
            <TitleDoc/>
            <div id="cover">
                <form method="get" action="" className='form__search'>
                    <input className="form-control input__search" type="text" placeholder="Nhập tên bác sĩ" required onChange={(event)=>{setKeyword(event.target.value)}} />
                </form>
            </div>
            <div className="wapper__faculty" style={{paddingTop: '50px',marginTop:'50px'}}>
                <div className="list__doc">
                    {listDoctor.filter((item)=>{
                        if(keyword==""){
                            return item
                        }else if(item.idUser.fullname.toLowerCase().includes(keyword.toLowerCase())){
                            return item
                        }
                    }).map((item,key)=>
                    <div className="list__item doctor" key={key}>
                        <div  className="item__avatar">
                            <Image src={item.idUser.avatar} width="100px" height="100px" roundedCircle style={{objectFit:'cover'}}/>
                        </div>
                        <div className="item__name">
                            <Form.Label >{item.idUser.fullname}</Form.Label>
                        </div>
                        <div className="item__chuyenkhoa">
                            <Form.Label >{item.idFaculty.name}</Form.Label>
                        </div>
                        <div className="item__content">
                            <Form.Label >{item.degree}</Form.Label>
                        </div>
                
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
