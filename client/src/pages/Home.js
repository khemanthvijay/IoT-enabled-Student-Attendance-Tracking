import '../App.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    let navigate = useNavigate();

    return (
        <div className='Home'>
            <h1>Welcome to the Student Portal</h1>
            <button onClick={() => {navigate('/registration')}}> Registration Page </button>
    
            <button onClick={() => {navigate('/attendance')}}> Mark Attendance </button>
    
            <button  onClick={() => {navigate('/details')}}> Student Attendance Details Page </button>
            <button onClick={() => {navigate('/stuattdetails')}}> Student Details  </button>
            <button onClick={() => {navigate('/updatett')}} > Update Time Table </button>
            <button onClick={() => {navigate('/viewtt')}} > View Time Table </button>
            <button onClick={() => {navigate('/Extrafeatures')}} > More Features</button>




        </div>
    );
}

export default Home;