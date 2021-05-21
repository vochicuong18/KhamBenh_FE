import React, { Component } from 'react'
import Header from '../components/Default/Header'
import './assets/listdoc.css'
// import SearchDoc from '../components/listdoctor/searchdoctor'
import ListDoc from '../components/listdoctor/list'
import TitleDoc from '../components/listdoctor/titlelist'
import axios from 'axios'
export default class listdoctor extends Component {
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
            return <ListDoc obj={object} key={i}/>;
        });
    }
    render() {
        return (
            <div>                
                <Header></Header> 
                <TitleDoc/>
                {/* <SearchDoc></SearchDoc> */}
               <div className="wapper__faculty" style={{paddingTop: '50px'}}>
                    <div className="list__doc">
                        {this.listDOC()}
                    </div>
                </div>
            </div>
        )
    }
}
