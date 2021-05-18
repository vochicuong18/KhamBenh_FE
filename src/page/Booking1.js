import React from 'react'
import Header from '../components/Default/Header'
import Result from '../components/Result/Result'
import ListDoc from './ListdoctorBook'
import Date from '../components/Booking/datetime'
import Reviewbook from '../components/Booking/Reviewbook'
// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';

export default function Booking(props) {
    const step1Content = <Result/>;
    const step2Content = <ListDoc/>
    const step3Content = <Date/>
    const step4content = <Reviewbook/>
    return(
        <div>
        <Header/>
        <h2 style={{width:'100%',textAlign:'center',marginTop:'50px'}}>Đặt khám ngay</h2>       
        <StepProgressBar
            startingStep={0}
            steps={[
                {
                    label: 'Kết quả chẩn đoán',
                    content: step1Content,
                    
                },
                {
                    label: 'Chọn bác sĩ',
                    content: step2Content,
            
                },
                {
                   
                    label: 'Chọn thời gian khám',
                    content: step3Content,
                },
                {
                    label: 'Thanh toán',
                    content: step4content,
                }
            ]}
        />
        </div>
    )
}
