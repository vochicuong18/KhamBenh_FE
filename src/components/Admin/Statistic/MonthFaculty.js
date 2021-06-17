import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Bar } from "react-chartjs-2";
export default function MonthFaculty() {
    const [listBook,setListBook] = useState([])
    const getList = []
    const getListFaculty =[]
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        async function getAPI(){
             await axios.get(process.env.REACT_APP_API_URL+'/api/statistic/StatisticsBookingOfFacultyByYear/2021')
             .then(response => {
                setListBook(response.data);  
                setLoading(true)             
             })
             .catch(function (error) {
                 console.log(error);
             })
        }
        getAPI();
    },[])
    if(loading === true){
        for (let i = 0; i < listBook.length; i++){
            getList.push(listBook[i].total)
            getListFaculty.push(listBook[i].faculty)
        }
        console.log(listBook);
        console.log(getList);

    }
    return (
            <Bar
                data={{
                labels: getListFaculty,
                datasets: [
                    {
                        backgroundColor: [
                            "#0D3B70",
                            "#1277BB",
                            "#DE3430",
                            "#64E1DC"
                          ],
                        label: "Số lịch khám theo khoa",
                        fill: true,
                        data: getList
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
