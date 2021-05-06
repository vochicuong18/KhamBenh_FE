import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import { Form, Button} from "react-bootstrap"
export default class list extends Component {
    render() {
        return (
            <div className="list__item">
                <div  className="item__avatar">
                    <Image src='' width="37%" roundedCircle />
                </div>
                <div className="item__name">
                    <Form.Label>{this.props.obj.fullname}</Form.Label>
                </div>
                <div className="item__chuyenkhoa">
                    <Form.Label >{this.props.obj.Faculty}</Form.Label>
                </div>
                <div className="item__content">
                    <Form.Label>{this.props.obj.description}</Form.Label>
                </div>
                <div className="item__btn">
                    <Button variant='primary'>Đặt lịch</Button>
                </div>
            </div>
        )
    }
}
