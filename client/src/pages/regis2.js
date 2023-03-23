import '../App.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Registration() {
  
    let navigate = useNavigate();

    const [id, setId] = useState(0);
    const [rid, setRid] = useState("202136254232");
    const [mobile, setMobile] = useState(0);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const[age, setAge] = useState(19);
    const[gender, setGender] = useState("Male");
    const[dept, setDept] = useState("IOT");
    const[year, setYear] = useState(2);
    const  [studentlist, setStudentlist] = useState([]);
    useEffect(() => {
      fun();
    }, []);
    const fun =()=>{
      Axios.get("http://65.49.44.136:5004/send/rfid").then((res)=>
      {
               setRid(res.data.data);

      })
  }
    const addStudentDetails = () => {
    window.location.reload();
        Axios.post('http://65.49.44.136:5004/registration/details', {
            id:id,
            rfid:rid,
            fName:fName,
            lName:lName,
            mobile:mobile, 
            age:age,
            gender:gender,
            dept:dept,
            year:year
        }).then(() => {
            console.log('success');
            setStudentlist([
                ...studentlist, 
                {
                    id : id,
                    rfid : rid,
                    fName : fName,
                    lName : lName,
                    mobile:mobile,
                    age : age,
                    gender : gender,
                    dept : dept,
                    year : year
                },
            ]);
        });
    };
   
    return (
        <div className='App'>
          <h1>Student Registration</h1>
          <br/>
          <h2>Enter Student Details !!!</h2>
          <br/>
      <div className='information'>
            <label>Id Number : </label>
            <input type = "number"
            onChange={(event) => {
            setId(event.target.value);
          }}
          />
            <label>RFID Number : </label> 
            <p>{rid}</p>
   
    
            <label>First Name : </label> 
            <input type = "text" 
            onChange={(event) => {
            setFName(event.target.value);
          }}
          />
            <label>Last Name : </label> 
            <input type = "text" 
            onChange={(event) => {
            setLName(event.target.value);
          }}
          />
           <label>Mobile : </label>
            <input type = "number" 
            onChange={(event) => {
            setMobile(event.target.value);
          }}
          />
            <label>Age : </label>
            <input type = "number" 
            onChange={(event) => {
            setAge(event.target.value);
          }}
          />
            <label>Gender : </label>
            <input type = "text" 
            onChange={(event) => {
            setGender(event.target.value);
          }}
          />
            <label>Department : </label>
            <input type = "text" 
            onChange={(event) => {
            setDept(event.target.value);
          }}
          />
            <label>Year : </label>
            <input type = "number" 
            onChange={(event) => {
            setYear(event.target.value);
          }}
          />
          <br/>
          <div className='fonal'>
            <div className='inf'>
          <button  onClick={() => {addStudentDetails();}}>Submit Student Details</button>
          </div>
          <div className='inf'>
          <button onClick={() => {navigate('/');}}> Home Page </button> 
          </div>
          </div>
            </div>
            </div>
      
    );
}

export default Registration;