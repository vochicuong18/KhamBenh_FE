import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import Image from 'react-bootstrap/Image'

function TableRow (props) {
    const [fullName] = useState(props.obj.idUser.fullname)
    const [khoa] = useState(getKhoa)
    const [address] = useState(props.obj.idUser.address)
    const [degree] = useState(props.obj.degree)
    const [avatar] = useState(props.obj.idUser.avatar)
    function getKhoa(){
        if(!props.obj.idFaculty){
            return('')
        }
        else{
            return(props.obj.idFaculty.name)
        }
    }
   
    return (
        <tr>
            <td></td>
            <td>{fullName}</td>
            <td>{khoa}</td>
            <td>{address}</td>
            <td>{degree}</td>
            <td width="200"><Image src={avatar} width="25%" height="50px" style = {{objectFit:'cover'}}/></td>
        </tr>       
    );
}

export default TableRow;