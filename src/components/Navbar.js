import React, { useEffect } from "react";
import { Link, useLocation,useNavigate} from "react-router-dom";

function Navbar() {
  const history =  useNavigate();
  let location = useLocation();
  useEffect(()=>{
  },[location]);
  const logout = ()=>{
    localStorage.removeItem('token');
    history('/login');
  }
   
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            myNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname=== "/"? "active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname=== "/about"? "active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem('token')?<div style={{ color: 'white' }}><i className="fas fa-user fa-lg mx-2"></i><button className="btn btn-outline-primary" onClick={logout}>Logout</button></div>:<form className="d-flex"  role="search">
              <Link role="button" to="/login"  className="btn btn-outline-primary me-2">Login</Link>
              <Link role="button" to="/signup" className="btn btn-outline-primary mx-2">Sign Up</Link>
            </form>
            }
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
