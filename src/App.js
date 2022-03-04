import './App.css';
import AboutUs from './components/AboutUs';
import Navbar from './components/Navbar';
import UpperCase from './components/UpperCase';
import React, { useState } from 'react'
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState("null");
  // const [color, setcolor] = chooseColor("white")

  const showAlert = (message,type) =>{
     setalert({
       msg:message,
       type:type
     })

     setTimeout(() => {
       setalert("null");
     }, 1500); // seconds
 }

  const ToggleMode = () =>{
    if(mode === "light"){
      setmode("dark");
      document.body.style.backgroundColor="red"
      showAlert("Enabled DarkMode","success")
    }  
    else{
      setmode("light");
      document.body.style.backgroundColor="white"
      showAlert("Enabled LightMode","success")
    }
  }  

  return (
    <>
    <Router>
    <Navbar title="TextUtils" know_more="Our History"  mode = {mode} ToggleMode = {ToggleMode}  />
    <Alert alert = {alert} />

   <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<UpperCase heading ="Enter Your Content Below" mode={mode} showAlert = {showAlert} />} />
    </Routes>
    </Router>
    </>
   );
}  
export default App;

