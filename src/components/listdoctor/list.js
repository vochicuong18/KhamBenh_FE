import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import { Form, Button} from "react-bootstrap"
export default class list extends Component {
    render() {
        return (
            <div className="list__item">
                <div  className="item__avatar">
                    <Image src={this.props.obj.logo} width="37%" roundedCircle />
                </div>
                <div className="item__name">
                    <Form.Label >{this.props.obj.name}</Form.Label>
                </div>
                <div className="item__chuyenkhoa">
                    <Form.Label >{this.props.obj.description}</Form.Label>
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
}
