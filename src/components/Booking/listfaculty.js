import React,{useState} from 'react'
import Image from 'react-bootstrap/Image'
import { Form, Button} from "react-bootstrap"
import NumberFormat from 'react-number-format';

export default function Listfaculty(props) {
    const [faculty] = useState(props.obj._id)
    function handleFaculty(e){
        localStorage.setItem('bookFac', faculty)

    }
    if(props.obj.price === 0){
        return (
            <div className="list__item faculty" tabIndex="-1"  onClick={handleFaculty} >
                <div  className="item__avatar">
                    <Image style = {{boxShadow: '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.2)'}} src={props.obj.logo} width="37%" roundedCircle />
                </div>
                <div className="item__name">
                    <Form.Label >{props.obj.name}</Form.Label>
                </div>
                <div className="item__name">
                    <Form.Label style={{fontWeight:'250',fontSize:'16px'}}>{props.obj.description}</Form.Label>
                </div>
                <div className="item__btn">
                    <Button disabled style={{fontWeight:'600'}} variant='outline-primary'>Miễn Phí</Button>
                </div>
            </div>
        )
    }else {
        return (
            <div className="list__item faculty" tabIndex="-1"  onClick={handleFaculty} >
                <div  className="item__avatar">
                    <Image style = {{boxShadow: '0 2px 4px 0 rgba(158, 158, 158, 0), 0 2px 15px 0 rgba(0, 0, 0, 0.2)'}} src={props.obj.logo} width="37%" roundedCircle />
                </div>
                <div className="item__name">
                    <Form.Label >{props.obj.name}</Form.Label>
                </div>
                <div className="item__name">
                    <Form.Label style={{fontWeight:'250',fontSize:'16px'}}>{props.obj.description}</Form.Label>
                </div>
                <div className="item__btn">
                    <Button disabled style={{fontWeight:'600'}} variant='outline-primary'><NumberFormat value = {props.obj.price} thousandSeparator={true} suffix={' VND'} displayType={'text'}/></Button>
                </div>
            </div>
        )
    }
}
