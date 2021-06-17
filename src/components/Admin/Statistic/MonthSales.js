import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Bar } from "react-chartjs-2";
export default function MonthBook() {
    const [listSales,setListSales] = useState([])
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/statistic/StatisticsSalesByYear/2021')
             .then(response => {
                setListSales(response.data);               
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    return (
            <Bar
                data={{
                labels: [
                    "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",
                ],
                datasets: [
                    {
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "#E8B65B",
                        label: "Doanh thu theo tháng",
                        fill: true,
                        data: listSales
                    }
                ]
                }}
                options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: "Predicted world population (millions) in 2050"
                }
                }}
            />
    )
}
