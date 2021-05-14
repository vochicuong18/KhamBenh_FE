import React,{useState} from 'react'
import Header from '../components/Default/Header'
import ListFaculty from '../components/Booking/bookhome'
import ListDoc from './listdoctor'
import Date from '../components/Booking/datetime'
import Reviewbook from '../components/Booking/Reviewbook'
// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';

export default function Booking(props) {
    const [faculty, setFaculty] = useState('')

    const step1Content = <ListFaculty/>;
    const step2Content = <ListDoc/>
    const step3Content = <Date/>
    const step4content = <Reviewbook/>
    // function step1Validator() {
    //     console.log(props.faculty);
    // }

    return(
        <div>
        <Header/>
        <h2 style={{width:'100%',textAlign:'center',marginTop:'50px'}}>Đặt khám ngay</h2>       
        <StepProgressBar
            startingStep={0}
            //onSubmit={onFormSubmit}
            steps={[
                {
                    label: 'Chọn chuyên khoa',
                    content: step1Content,
                    // validator: step1Validator
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
