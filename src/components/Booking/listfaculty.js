import React from 'react'
import Image from 'react-bootstrap/Image'
import { Form, Button} from "react-bootstrap"
export default function Listfaculty(props) {
    return (
        <div className="list__item">
            <div  className="item__avatar">
                <Image src={props.obj.logo} width="37%" roundedCircle />
            </div>
            <div className="item__name">
                <Form.Label >{props.obj.name}</Form.Label>
            </div>
            <div className="item__chuyenkhoa">
                <Form.Label >{props.obj.price}</Form.Label>
            </div>
            {/* <div className="br"> </div> */}
            <div className="item__content">
                <Form.Label >Description</Form.Label>
            </div>
            <div className="item__btn">
                <Button variant='primary'>Xem thêm</Button>
            </div>
        </div>
    )
}
