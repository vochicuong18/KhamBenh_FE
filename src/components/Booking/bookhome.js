import React, { Component } from 'react'
import ListFaculty from '../Booking/listfaculty'
import Image from 'react-bootstrap/Image'
import axios from 'axios'
export default class listdoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {faculty:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/api/faculty/get')
            .then(response => {
                console.log(response.data);
                this.setState({faculty: response.data});               
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    listFaculty() {
        return this.state.faculty.map(function (object, i) {
            return <ListFaculty obj={object} key={i}/>;
        });
    }
    render() {
        return (
            <div> 
            <div className="background__faculty">
                <Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/images/smart-clinic/service-list-wave-left.svg' alt='bg'/>
            </div>
            <div className="background__faculty bgright">
                <Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/images/smart-clinic/service-list-wave-left.svg' alt='bg'/>
            </div>
                        
                <div className="wapper__faculty">
                    <div style={{display: 'flex' , marginLeft:'70px'}} >
                        <Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg' alt = 'iconchonkhoa'/> 
                        <h3 style={{marginLeft:'15px',marginTop:'18px'}}>Chọn dịch vụ</h3>
                    </div>
                    <div className="list__doc">
                        {this.listFaculty()}
                    </div>
                </div>
            </div>
        )
    }
}
