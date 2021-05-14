import React, {useState} from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'react-bootstrap/Image'
import {Form} from 'react-bootstrap';
function Datetime() {
	
	const [selectDate] = useState('');
	const [time,setTime] = useState('')
	localStorage.setItem('bookTime',time)
	function handleTime (e){
		setTime(e.target.value)
		console.log(e.target.value);
	}
	
		
		
		
    return (
        <div className="wapper__faculty">
			<div style={{display: 'flex' , marginLeft:'70px'}} >
				<Image src='https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.1.4/assets/icons/smart-clinic/note-icon.svg' alt = 'iconchonkhoa'/> 
				<h3 style={{marginLeft:'15px',marginTop:'18px'}}>Chọn thời gian khám</h3>
			</div>
			<div className='datetime'>
			<div className="date">
				<DatePicker className = 'form-control' 
					placeholderText="Chọn giờ"
					onChange={date => localStorage.setItem('bookDate',date.getDate() +'/'+ date.getMonth() +'/'+ date.getFullYear())}
					// defaultValue={localStorage.getItem('bookDate')} 
					minDate={new Date()}
				/>
			</div>
			<div className="time">
				<div>
					<Form.Control as="select" onChange={handleTime}>
						<option>Chọn giờ</option>
						<option>8:00</option>
						<option>9:00</option>
						<option>10:00</option>
						<option>11:00</option>
						<option>13:00</option>
						<option>14:00</option>
						<option>15:00</option>
						<option>16:00</option>
					</Form.Control>
				</div>
			</div>
			</div>
    	</div>
     
    )
}
export default Datetime
