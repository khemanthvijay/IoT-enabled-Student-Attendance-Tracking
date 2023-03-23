import '../App.css'
import Axios from 'axios';
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
     
   

    let navigate = useNavigate();
    const [tim, setTim] = useState(0);
    const changedel=()=>{
    Axios.get(`http://65.49.44.136:5004/changedelay/${tim}`).then((res)=>{
        if(res.data==="ok"){
            console.log('ok')
        }
    })
}
    const changtim=(id)=>{
        console.log(id)
        Axios.get(`http://65.49.44.136:5004/changetim/${id}`).then((res)=>{
            if(res.data==="ok"){
                console.log('ok')
            }
        })
    }
    const changeserver=(id)=>{
        Axios.get(`http://65.49.44.136:5004/onoff/${id}`).then((res)=>{
            if(res.data==="ok"){
                console.log('ok')
            }
        })
    }
    return (
        <div className='Home'>
            <h1>Features</h1>
            <div className='Hem'>
            <label>Change delay Time : </label> 
            <input id = "input" type = 'number' placeholder='Enter time' 
            onChange={(event) => {
                setTim(event.target.value);
            }}></input>
            <button  onClick={() => {changedel();}}> update</button>
            </div>
            <div className='Hem'>
            <label>Set Class time : </label>
                <select name = "classtime" className='dropd' onChange={event=> 
                changtim(event.target.value)
            }>
                    <option>Select one</option>
                    <option  value= "1">7:20</option>
                    <option value= "2" >9:00</option>
                </select>
                </div>
            {/* <h4>Set Class time</h4>

            <button  onClick={() => {changtim(1);}}> 7:20 </button>
            <button  onClick={() => {changtim(2);}}> 9:00 </button>
            <button onClick={() => {navigate('/')}}> Home Page </button> */}
            <div className='Hem'>
            <button  onClick={() => {changeserver(1);}}> ON Server</button>
            <button  onClick={() => {changeserver(2);}}> Off Server </button>
            </div>
            <br/>
            <br/>
            <br/>

            <button onClick={() => {navigate('/')}}> Home Page </button>
        </div>
    );
}

export default Home;