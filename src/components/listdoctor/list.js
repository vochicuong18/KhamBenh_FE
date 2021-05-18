import React, { useState } from 'react'
import Image from 'react-bootstrap/Image'
import { Form, Button} from "react-bootstrap"
function ListDoctor (props){
    const [doctor] = useState(props.obj._id)
    function handleDoctor(e){
        // setDoctor(props.obj._id)
        // localStorage.removeItem('bookDoctor')
        localStorage.setItem('bookDoctor', doctor)
    }
        return (
            <div className="list__item doctor">
                <div  className="item__avatar">
                    <Image src={props.obj.idUser.avatar} width="100px" height="100px" roundedCircle style={{objectFit:'cover'}}/>
                </div>
                <div className="item__name">
                    <Form.Label >{props.obj.idUser.fullname}</Form.Label>
                </div>
                <div className="item__chuyenkhoa">
                    <Form.Label >{props.obj.idFaculty.name}</Form.Label>
                </div>
                {/* <div className="br"> </div> */}
                <div className="item__content">
                    <Form.Label >{props.obj.degree}</Form.Label>
                </div>
                <div className="item__btn">
                    <Button onClick={handleDoctor} variant='primary'>Xem thêm</Button>
                </div>
            </div>
        )
}
export default ListDoctor
