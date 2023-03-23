import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Attendance from './pages/Attendance';
import Details from './pages/Details';
import Stuattdetails from "./pages/Stuattdetails";
import Updatett from "./pages/Upadatett";
import Submitrfidstudentdata from "./pages/regis2";
import Viewtt from "./pages/Viewtt";
import Extrafeatures from "./pages/Extrafeatures";




function App() {

  return (
    <div className="App">
      <Router>
        <nav>
        <Link to = "/"></Link>
        </nav>
        <Routes>
          <Route path = "/" element = { <Home/> }></Route>
          <Route path = "/registration" element = { <Registration/> }></Route>
          <Route path = "/attendance" element = { <Attendance/> }></Route>
          <Route path = "/details" element = { <Details/> }></Route>
          <Route path = "/stuattdetails" element = { <Stuattdetails/> }></Route>
          <Route path = "/updatett" element = { <Updatett/> }></Route>
          <Route path = "/Submitrfidstudentdata" element = {<Submitrfidstudentdata/>}></Route>
          <Route path = "/viewtt" element = { <Viewtt/> }></Route>
          <Route path = "/Extrafeatures" element = { <Extrafeatures/> }></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
