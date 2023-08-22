import React,{useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alerts from "./components/Alerts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserState from "./context/users/UserState";
function App() {
  const[alert,setAlert] = useState(null);

  const showAlert = (message,type)=>{
    setAlert({message:message,
      type:type})

      setTimeout(() => {
        showAlert(null);
      }, 4000);
  }
  return (
    <>
    <UserState>
      <NoteState>

        <Router>
          <Navbar />
          <Alerts alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/users" />
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
