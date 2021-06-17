import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Line } from "react-chartjs-2";
export default function MonthBook() {
    const [listBook,setListBook] = useState([])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/statistic/StatisticsBookingByYear/2021')
             .then(response => {
                setListBook(response.data);               
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    return (
            <Line
                data={{
                labels: [
                    "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",
                ],
                datasets: [
                    {
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        label: "Số lịch khám theo tháng",
                        fill: true,
                        data: listBook
                    }
                ]
                }}
                options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: ""
                }
                }}
            />
    )
}
