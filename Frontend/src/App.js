
import './App.css';
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navigation from './components/navbar/Navigation'
import Register from './pages/Register';
import Login from './pages/login'
import { useState } from 'react';
import Home from './pages/home';
import AddCourse from './pages/addCourse';
import { useEffect } from 'react';
import Students from './pages/students';

function App() {
  const [loggedIn,setLoggedIn] = useState(false); 
  
  useEffect(()=>{
     var getToken = window.sessionStorage.getItem("sid")
     console.log(getToken)
     if(getToken){
       setLoggedIn(true)
     } 
  },[])

  function changeLoginState(){
    setLoggedIn(true)
  }

  return (
    <div>
      <Navigation isLoggedIn={loggedIn} />
      <div className="mx-20 my-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login"  element={<Login changeState={changeLoginState} />}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route path="/allStudents" element={<Students/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
