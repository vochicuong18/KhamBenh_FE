import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import 'react-toastify/dist/ReactToastify.css'
function ImportExcel() {
    const readExcel=(file)=>{
        const promise = new Promise((resolve,reject) =>{
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            
            fileReader.onload=(e)=>{
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, {type:'buffer'});
                const wsname = wb.SheetNames[0];
                const ws=wb.Sheets[wsname];
                const data= XLSX.utils.sheet_to_json(ws,{ header: 1, blankRows: false}); 
                resolve(data)
            }
            fileReader.onerror=((error)=>{
                reject(error)
            })
        })
        promise.then((response)=>{
            console.log(response);
            axios.post(process.env.REACT_APP_API_URL+'/api/diagnostic/create', response)
            .then(response => {
                console.log(response.data);
                toast.success(response.data.message)
            })

            .catch((err) => {
                toast.error(err.response.data.message)
            })

        })
    }
    return(
        <div>
            <div className="modal fade" id="themBacSi" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Thêm triệu chứng</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">                           
                            <div className="form-group">
                                <div className='form__info'>
                                    <label htmlFor="">Avatar:</label>
                                    <input type="file" className="form-control-file" onChange ={(e)=>{
                                        const file  = e.target.files[0];
                                        readExcel(file)
                                    }}/>
                                </div>
                            </div>  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            {/* <button type="button" onClick = {addDoctor} className="btn btn-primary">Lưu</button> */}
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>
    );
    
}
export default ImportExcel;
