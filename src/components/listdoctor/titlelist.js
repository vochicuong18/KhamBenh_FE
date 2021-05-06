import React, { Component } from 'react'
import VideoBG from "../../Video/bg_doctor.mp4"

export default class titlelist extends Component {
    render() {
        return (
            <div>
                <div>
                    <video autoPlay loop muted style={{position: 'absolute',width:'100%',height:'100vh',objectFit: 'cover', zIndex:-1}}>
                        <source src={VideoBG}></source>
                    </video>
                </div>
                
                <div className="title__list">
                    <h2>Tìm bác sĩ của bạn</h2>
                    <div className='color__title' data-aos="fade-up"></div>
                </div>
            </div>
        )
    }
}
