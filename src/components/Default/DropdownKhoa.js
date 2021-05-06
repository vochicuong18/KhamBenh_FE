import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';

export default function DropdownKhoa() {
    const [idFaculty,setKhoa] = useState([])
    useEffect(() => {
        async function getAPI(){
             await axios.get('http://localhost:9000/api/faculty/get')
            .then((response) => {
                setKhoa(response.data);
                return response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }
        getAPI();
    },[])
    return (
        <div>
          <select className= 'form-control'> 
            {idFaculty.map((item) => (
                <option
                    key={item._id}
                    value={item._id}
                >
                    {item.name}
                </option>
            ))}
            </select>   
        </div>
    )
}
