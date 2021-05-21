import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
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
            <FontAwesomeIcon icon ={faCheckCircle} style={{fontSize:'150px', color:'green'}}/>
                <h4 style={{marginTop:'20px',marginBottom:'20px'}}>Thanh toán thành công</h4>
                <Button variant='primary' onClick={ReturnHome}>Quay về trang chủ</Button>
            </Form>
            </div>
        </div>
    )
}
