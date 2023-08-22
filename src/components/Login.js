import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const Login = (props) => {
  const history =  useNavigate();
  const userDataContext = useContext(UserContext);
  const {loginUser} = userDataContext;
  const [credentials,setCredentials] = useState({email:"",password:""})
    const handleSubmit = async (e)=>  {
        e.preventDefault();
           // const response = await fetch(`http://localhost:5000/api/auth/login`, {
        //     method: "POST",// Method of fetch
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body : JSON.stringify({email:credentials.email,password:credentials.password})
        //   });
        //   const json = await response.json();
          const json = await loginUser(credentials.email,credentials.password)
          if(json.success)
          {
            //console.log(json.authToken)
            localStorage.setItem('token',json.authToken);
            history('/')
            props.showAlert("LoggedIn successfully","success");
          }
          else
          {
            props.showAlert("Invalid Credentials","danger");
          }
    }
    
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <span id="passwordHelpInline" className="form-text">
            Must be 8-20 characters long.
          </span>
        </div>
        <button type="submit" className="btn btn-primary" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
