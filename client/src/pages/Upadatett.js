import '../App.css'
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';

function Upadatett() {
    
const [subject,setSubject] = useState('');
const [chour,setChour] = useState(0);
const [hour,setHour] = useState(0);
const [cday,setCday] = useState('');
const [day,setDay] = useState('');
const[time,setTime] = useState('');
const[checksubj,setChecksubj]=useState('');

    let navigate = useNavigate();
    function updatetable(){
        console.log('called')
        Axios.get(`http://65.49.44.136:5004/update/timetable/${hour}/${day}/${subject}`).then((res)=>{
            if(res==="ok"){
                alert('upadted sucess')
            }
        })
    }
    function updatetime(){
        Axios.get(`http://65.49.44.136:5004/settime/${hour}/${time}`).then((res)=>{
            if(res.data==="ok"){
                alert('upadted sucess')
            }
        })
    }
    function checksub(){
        Axios.get(`http://65.49.44.136:5004/check/timetable/${hour}/${day}/`).then((res)=>{
            setChecksubj(res.data);
            console.log(res.data);
        })
    }
    function clear() {
        document.getElementById("input").value="";
    }
    return (
        <div className='Home'>
          
           <h1>Update Time table</h1>
           <h2>check previous data</h2>
           <div>
           <label>Day : </label>
                <select name = "day" value={cday} className='dropd' onChange={event=>setCday(event.target.value)}>
                    <option>Select Day</option>
                    <option >Monday</option>
                    <option >Tuesday</option>
                    <option >Wednesday</option>
                    <option >Thrusday</option>
                    <option >Friday</option>
                    <option >Saturday</option>
                 </select> {" "}

                 <label>Hour : </label>
         <select name = "hour" value={chour} className='dropd' onChange={event=>setChour(event.target.value)}>
                    <option>Select Hour</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                    <option value="7">H7</option>
                    <option value="8">H8</option>
                    <option value="9">H9</option>
                    <option value="10">H10</option>
                    <option value="11">H10</option>
                 </select>  {" "}

            <button  onClick={() => { checksub();clear()}}> check </button>
            </div>
            <div>
                {checksubj}
            </div>
            <h2>Update new values</h2>
           <div>
           <label>Subject : </label>
                <select name = "subject" value={subject} className='dropd' onChange={event=>setSubject(event.target.value)}>
                    <option>Select Subject</option>
                    <option  >adc</option>
                    <option >OE-1</option>
                    <option >OE-2</option>
                    <option >OE-3</option>
                 </select>
            {" "}
                <label>Day : </label>
                <select name = "day" value={day} className='dropd' onChange={event=>setDay(event.target.value)}>
                    <option>Select Day</option>
                    <option >Monday</option>
                    <option >Tuesday</option>
                    <option >Wednesday</option>
                    <option >Thrusday</option>
                    <option >Friday</option>
                    <option >Saturday</option>
                 </select> {" "}

         <label>Hour : </label>
         <select name = "hour" value={hour} className='dropd' onChange={event=>setHour(event.target.value)}>
                    <option>Select Hour</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                    <option value="7">H7</option>
                    <option value="8">H8</option>
                    <option value="9">H9</option>
                    <option value="10">H10</option>
                    <option value="11">H10</option>
                 </select> {" "}

      
         <label>Time slot </label> {" "}
            <input id = "input" type = 'Time' placeholder='Enter Hour' 
            onChange={(event) => {
                 setTime(event.target.value);
            }}></input>

            </div>
            <div>
            <button  onClick={() => { updatetable();clear()}}> time table </button>{" "}
            <button  onClick={() => { updatetime();clear()}}> upadte time </button>
            </div>
          <div className ="boxfors">
            <h4>Hour - 1 : 7:20 to 8:10</h4>
            <h4>Hour - 2 : 8:10 to 9:00</h4>
            <h4>Hour - 3 : 9:00 to 9:50</h4>
            <h4>Hour - 4 : 9:50 to 10:40</h4>
            <h4>Hour - 5 : 11:00 to 11:50</h4>
            <h4>Hour - 6 : 11:50 to 12:40</h4>
            <h4>Hour - 7 : 12:40 to 01:30 [Lunch]</h4>
            <h4>Hour - 8 : 01:30 to 2:20</h4>
            <h4>Hour - 9 : 02:20 to 3:10</h4>
            <h4>Hour - 10 : 03:20 to 4:10</h4>
            <h4>Hour - 11 : 04:10 to 05:00</h4>
          </div>
          <button onClick={() => {navigate('/')}}> Home Page </button>
        </div>
    );
}

export default Upadatett;
