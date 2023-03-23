import '../App.css'
import { useState, React } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Attendance() {

    let navigate = useNavigate();

    const [id, setId] = useState("");

    const addRecord = () => {
      console.log('hi')
        Axios.post("http://65.49.44.136:5004/enter/attendance", {
          id: id
        }).then((res) => {
          if(res.data==='updated'){
            console.log("sucess")
          }
          else{
            alert('updation failed')
          }
        })
        
      }
    
    return (
        <div className='App'>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>Enter Attendance</h1>
          <br/>
          <div className='rfid'>
          <label>ID Number : </label> 
          <input type = "text" 
          onChange={(event) => {
          setId(event.target.value);
        }}
        />
        </div>
        <br/>
        <button  onClick= {() =>{addRecord()}}>Submit</button>
        <br/><br/>
        <button  onClick={() => {navigate('/')}}> Home Page </button>
        </div>
    );
}

export default Attendance;