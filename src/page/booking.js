import React,{useState} from 'react'
import Header from '../components/Default/Header'
import ListFaculty from '../components/Booking/bookhome'
import ListDoc from './ListdoctorBook'
import Date from '../components/Booking/datetime'
import Reviewbook from '../components/Booking/Reviewbook'
import 'react-step-progress/dist/index.css';
import { Steps} from 'antd';
export default function Booking(props) {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    const onChange  = (current) => {
      setCurrent(current);
    };

    const step1Content = <ListFaculty/>;
    const step2Content = <ListDoc/>
    const step3Content = <Date/>
    const step4content = <Reviewbook/>
    const steps = [
        {
          title: 'Chọn khoa',
          content: step1Content,
        },
        {
          title: 'Chọn bác sĩ',
          content:step2Content,
        },
        {
          title: 'Chọn thời gian khám',
          content: step3Content,
        },
        {
            title: 'Thanh toán',
            content: step4content,
        }
      ];
    return(
        <div>
        <Header/>
        <h2 style={{width:'100%',textAlign:'center',marginTop:'50px'}}>Đặt khám ngay</h2>       
        <Steps
          type="navigation"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step title="Chọn khoa" />
          <Step title="Chọn bác sĩ" />
          <Step title="Thời gian khám" />
          <Step title="Xác nhận" />
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        </div>
    )
}
