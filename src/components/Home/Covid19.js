import React, {useState,useEffect} from 'react';
import flagVN from "../../Video/vietnam1.png"
import axios from 'axios'
export default function Covid19() {
    const [infec,setInfec] = useState('')
    const [death,setDeath] = useState('')
    const [treated,setTreated] = useState('')
    const [recovered, setRecovered] = useState('')
    useEffect(() => {
        async function getAPI(){
             await axios.get('https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST?disableRedirect=true')
            .then((response) => {
                setInfec(response.data.infected)
                setDeath(response.data.deceased)
                setTreated(response.data.treated)
                setRecovered(response.data.recovered)
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    return (
        <div>
            <div className="covid">
                <div className="title">
                    <h3>Tổng quan về số ca nhiễm COVID-19</h3>
                    <img src={flagVN} alt='VN' style = {{marginBottom:'15px',marginLeft:'16px'}} />
                </div>
                <div className="covid__vietnam">
                    <div className="vietnam__data">
                        <div className="data tongsocanhiem">Tổng số ca nhiễm {infec}</div>
                        <div className="data dieutri">Đang điều trị {treated}</div>
                        <div className="data khoi">Khỏi {recovered}</div>
                        <div className="data tuvong">Tử vong {death}</div>
                    </div>
                    <br/>
                    Theo thống kê từ https://ncov.moh.gov.vn/
                </div>
                
            </div>
        </div>
    )
}
