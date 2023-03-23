import '../App.css'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, React } from 'react';

function Studentdetails() {

    let navigate = useNavigate()

    const [id, setId] = useState(0);
    const [subject, setSubject] = useState('');
    const [total, setTotal] = useState([]);
    const[percentage,setPercentage]=useState(0.00);
    const getStudent = (id, subject) => {
        Axios.get(`http://65.49.44.136:5004/getattendance/${id}/${subject}`).then((response) => {
          setTotal(response.data);
          setPercentage((response.data[0].Present/response.data[0].Total)*100);
        })
      }
  function clear() {
        document.getElementById("input").value="";
    }

    return (
        <div className='details'>
            <h1>Student Attendance</h1>
            <div className='labe'>
            {/* <button class = "buttons" onClick={getStudentDetails}>Get All Student Details</button> */}
            <br></br>
            <br/>
            <br/>
            <label> Id Num : </label>
            <input id = "input" type = 'number' placeholder='Enter the Id Number' 
            onChange={(event) => {
                setId(event.target.value);
            }}></input>
            <br/>
            <br/>
          
            {/* <label>Subject : </label>
           <input id="Subjectname" type = "text" placeholder='Enter Subject Name'></input>
         */}
             <label>Subject: </label>
                <select name = "subject" value={subject} className='dropd' onChange={event=> 
                setSubject(event.target.value)
            }>
                    <option>Select one</option>
                    <option >adc</option>
                    <option >fc</option>
                    <option >fl</option>
                    <option >pbl</option>
                    <option >crs</option>
                    <option >iotpa</option>
                    <option >sac</option>
                    <option >pbl</option>
                    <option >oe</option>
                    <option >esd</option>
                    <option >uhv</option>
                    <option >dnp</option>
                </select>
           <br/>
           <br/>
           
            <button  onClick={() => {getStudent(id, subject); clear()}}> Submit </button>
            <br/>
            <br/>
            <br/>
            {
            total.map((val, key) => {
                return (
                <div className='list'>
                    <table>
                        <thead>
                        <tr>
                            <th>Total Conducted</th>
                            <th>Total Attended</th>
                            <th>Percentage</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><p key = {val.Total}>{val.Total}</p></td>
                                <td><p key = {val.Present}>{val.Present}</p></td>
                                <td>{percentage.toFixed(2)}</td>
                            </tr>

                        </tbody>
                       
                    </table>
                </div>
                    );
                })
            }
           
              <br/>
            
            <button onClick={() => {navigate('/')}}> Home Page </button>
            </div>
            
        </div>
    );
}

export default Studentdetails;

































// import '../App.css'
// import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
// import { useState, React } from 'react';

// function Studentdetails() {

//     let navigate = useNavigate()

//     const [studentList, setStudentList] = useState([]);
//     const [id, setId] = useState(0);

//     const getStudentDetails = () => {
//         Axios.get('http://localhost:3001/get/details/all').then((response) => {
//             setStudentList(response.data); 
//             console.log(response.data);
//         })
//     }

//     const getStudent = (id) => {
//         Axios.get("http://localhost:3001/get/details/${id}").then((response) => {
//             setStudentList(response.data);
//         })
//     }

//     function clear() {
//         document.getElementById("input").value="";
//     }

//     return (
//         <div className='details'>
//             <h1>Student Details</h1>
//             <div className='labe'>
//             <button class = "buttons" onClick={getStudentDetails}>Get All Student Details</button>
//             <br></br>
//             <br/>
//             <br/>
//             <label> Id Num : </label>
//             <input id = "input" type = 'number' placeholder='Enter the Id Number' 
//             onChange={(event) => {
//                 setId(event.target.value);
//             }}></input>
//            <br/>
//            <br/>
//             <button  onClick={() => {getStudent(id); clear()}}> Submit </button>
//             <br/>
//             <br/>
//             <br/>
//             {
//             studentList.map((val, key) => {
//                 return (
//                 <div className='list'>
//                     <table>
//                         <thead>
//                         <tr>
//                             <th>ID Number</th>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Age</th>
//                             <th>Gender</th>
//                             <th>Department</th>
//                             <th>Year</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td><p key = {val.idno}>{val.idno}</p></td>
//                                 <td><p key = {val.firstname}>{val.firstname}</p></td>
//                                 <td><p key = {val.lastname}>{val.lastname}</p></td>
//                                 <td><p key = {val.age}>{val.age}</p></td>
//                                 <td><p key = {val.gender}>{val.gender}</p></td>
//                                 <td><p key = {val.dept}>{val.dept}</p></td>
//                                 <td><p key = {val.year}>Year : {val.year}</p></td>

//                             </tr>

//                         </tbody>
                       
//                     </table>
//                     <p key = {val.idno}>ID Number : {val.idno}</p>
//                     {/* <p key = {val.firstname}>First Name : {val.firstname}</p>
//                     <p key = {val.lastname}>Last Name : {val.lastname}</p>
//                     <p key = {val.age}>Age : {val.age}</p>
//                     <p key = {val.gender}>Gender : {val.gender}</p>
//                     <p key = {val.dept}>Department : {val.dept}</p>
//                     <p key = {val.year}>Year : {val.year}</p> */}
//                 </div>
//                     );
//                 })
//             }
//               <br/>
//             <button onClick={() => {navigate('/')}}> Home Page </button>
//             </div>
//         </div>
//     );
// }

// export default Studentdetails;