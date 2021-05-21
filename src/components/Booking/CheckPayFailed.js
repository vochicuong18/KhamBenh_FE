import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import Header from '../Default/Header'
import {useHistory} from 'react-router-dom'
export default function CheckPaySuccess() {
    const history = useHistory();
    function ReturnHome(){
        history.push('/home')
    }
    return (
        <div>
             <div>
            <Header/>
            <Form className='form__info forgotpass' style={{textAlign: 'center'}}>
            <FontAwesomeIcon icon ={faExclamationCircle} style={{fontSize:'150px', color:'red'}}/>
                <h4 style={{marginTop:'20px',marginBottom:'20px'}}>Có lỗi trong lúc thanh toán</h4>
                <Button variant='primary' onClick={ReturnHome}>Quay về trang chủ</Button>
            </Form>
            </div>
        </div>
    )
}
