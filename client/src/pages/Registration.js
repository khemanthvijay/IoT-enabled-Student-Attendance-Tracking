import '../App.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Axios from 'axios';

function Registration() {
  
    let navigate = useNavigate();

    const [rid, setRid] = useState(0);
    function sendrf(){
      Axios.get("http://65.49.44.136:5004/send/rfid").then((res)=>
      {
               setRid(res.data.data);
               console.log("Rfid is ="+rid);
      })
    }
    const id=setInterval(sendrf,1000);
      useEffect(()=>{
        window.onpopstate=()=>{
          clear();
        }
       } )
  
   const clear=()=>{
    console.log('clearing')
    clearInterval(id);
    }
    return (
        <div className='App'>
          <h1>Student Registration</h1>
          <br/>
          <h2>Scan your RFID !!!</h2>
          <br/>
      <div className='information'>
           
            <label>RFID Number : </label> 
           <p>{rid}</p>           
          <br/>
          <div className='fonal'>
            <div className='inf'>
          </div>
          <div className='inf'>
          <button  onClick={() => {navigate('/Submitrfidstudentdata');clear()}}>Fill Student Details </button>

          <button onClick={() => {navigate('/');clear()}}> Home Page </button> 
          </div>
          </div>
            </div>
            </div>
      
    );
}

export default Registration;