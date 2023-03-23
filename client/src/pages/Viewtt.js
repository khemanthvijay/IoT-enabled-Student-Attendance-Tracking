import '../App.css'
import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';

function Viewtt() {

    let navigate = useNavigate();
    const [total, setTotal] = useState([]);
    useEffect(() => {
        timetab();
      }, []);
    const timetab=()=>{
        Axios.get('http://65.49.44.136:5004/showtimetable').then((res)=>{
            setTotal(res.data);
         })
    }
   // timetab();
    return (
        <div className='Home'>
            <h1>Time Table</h1>
                <div className='list'>
                    <table>
                        <thead>
                        <tr>
                            <th>Day</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                        </tr>
                        </thead>
                        <tbody>{
                        total.map((val, key) => (
                            <tr>
                                <td>{val.Day}</td>
                                <td>{val.hour1}</td>
                                <td>{val.hour2}</td>
                                <td>{val.hour3}</td>
                                <td>{val.hour4}</td>
                                <td>{val.hour5}</td>
                                <td>{val.hour6}</td>
                                <td>{val.hour7}</td>
                                <td>{val.hour8}</td>
                                <td>{val.hour9}</td>
                                <td>{val.hour10}</td>
                                <td>{val.hour11}</td>
                                
                            </tr>
))}
                        </tbody>
                       
                    </table>
                    
                </div>
            <button onClick={() => {navigate('/')}}> Home Page </button>

        </div>

        );
    }
export default Viewtt;