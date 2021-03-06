import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
// import Header from '../components/Default/Header'
import './assets/listdoc.css'
// import SearchDoc from '../components/listdoctor/searchdoctor'
import ListDoc from '../components/listdoctor/list'
// import TitleDoc from '../components/listdoctor/titlelist'
import axios from 'axios'
export default class listdoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {bacsi:[]};
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/api/doctor/getbyfaculty/' + localStorage.getItem('bookFac'))
            .then(response => {
                console.log(response.data);
                this.setState({bacsi: response.data});               
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    listDOC() {
        return this.state.bacsi.map(function (object, i) {
            return <ListDoc obj={object} key={i}/>;
        });
    }
    render() {
        return (
            <div>                
                {/* <Header></Header> 
                <TitleDoc/> */}
               <div className="wapper__faculty"style={{marginTop:'3%'}}>
                    <div style={{display: 'flex' , marginLeft:'70px'}} >
                        <Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg' alt = 'iconchonkhoa'/> 
                        <h3 style={{marginLeft:'15px',marginTop:'18px'}}>Chọn bác sĩ</h3>
                    </div>
                    <div className="list__doc">
                        {this.listDOC()}
                    </div>
                </div>
            </div>
        )
    }
}
