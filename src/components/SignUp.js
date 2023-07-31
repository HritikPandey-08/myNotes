import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const history =  useNavigate();
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit = async (e)=>  {
        e.preventDefault();
        // Check if passwords match
        if (credentials.password !== credentials.cpassword)
        {
          props.showAlert("Passwords do not match","warning");
          return;
        }
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",// Method of fetch
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({name:name, email:email, password:password})
          });
          const json = await response.json();
          if(json.success)
          {
            localStorage.setItem('token',json.authtoken);
            history('/')
            props.showAlert("Account created successfully","success");
          }
          else
          {
            props.showAlert(json.error,"danger");
          }
    }
    
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            minLength={3}
          />
        </div>
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
            minLength={5}
            required
          />
          <span id="passwordHelpInline" className="form-text">
            Must be 8-20 characters long.
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={handleChange}
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
