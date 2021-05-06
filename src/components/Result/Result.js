import React, { Component } from 'react'
// import Image from 'react-bootstrap/Image'
// import { Form, Button} from "react-bootstrap"
export default class Result extends Component {
    render() {
        return ( <
            div >
            <
            div className = "result__wapper" >
            <
            div className = "title" >
            <
            h2 > Kết quả chẩn đoán < /h2> <
            div className = "color__title" > < /div> <
            /div> <
            div className = 'result__ketqua' >
            <
            div className = 'ketqua__benh' > Chào bạn, bạn đã bị: { localStorage.getItem('Name') } < /div> <
            div className = 'ketqua__khoa' > Bạn nên đến khoa { localStorage.getItem('Khoa') }
            của chúng tôi để được hỗ trợ < /div> <
            /div>


            <
            /div> <
            /div>
        )
    }
}