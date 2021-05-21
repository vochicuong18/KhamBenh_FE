import React, { Component } from 'react'
import Result from '../components/Result/Result'
import Header from '../components/Default/Header'
import ListDocResult from '../components/Result/list'
import './assets/result.css'
import axios from 'axios'
export default class Ketqua extends Component {
    constructor(props) {
        super(props);
        this.state = {bacsi:[]};
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/api/doctor/get')
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
            return <ListDocResult obj={object} key={i}/>;
        });
    }
    render() {
        return (
            <div>
                <Header/>
                <Result/>
                <div className="wapper_listdoc">
                    {/* <ListDocResult /> */}
                    <div className="list__doc">
                        {this.listDOC()}
                    </div>
                </div>
            </div>
             
        )
    }
}
