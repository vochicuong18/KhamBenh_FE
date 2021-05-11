import React, { Component } from 'react'
import ListFaculty from '../Booking/listfaculty'

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
                <div className="wapper_listdoc">
                    <div className="list__doc">
                        {this.listFaculty()}
                    </div>
                </div>
            </div>
        )
    }
}
