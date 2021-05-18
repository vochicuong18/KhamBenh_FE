import React, { Component } from 'react'
// import Image from 'react-bootstrap/Image'
// import { Form, Button} from "react-bootstrap"
export default class Result extends Component {
    render() {
        return ( 
        <div className="wapper__faculty" style={{padding: '100px 100px'}}>
            <div className = "result__wapper">
                <div className = "title">
                    <h2> Kết quả chẩn đoán </h2> 
                {/* <div className = "color__title" > </div>  */}
            </div>
            <div className = 'result__ketqua'>
                <div className = 'ketqua__benh'><p>Chào bạn, bạn đã bị: <strong>{localStorage.getItem('Name')}</strong></p> 
                </div> 
                <div className = 'ketqua__khoa'> Bạn nên đến khoa <strong>{localStorage.getItem('Khoa')}</strong> của chúng tôi để được hỗ trợ
                </div> 
            </div>
            </div>
        </div>
        )
    }
}