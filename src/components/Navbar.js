import React, { useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import AlertContext from "../context/alert/alertContext";
import LogoImage from "../diary.png";
// import AuthContext from "../context/user/authContext";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {}, [location]);

  const alertContext = useContext(AlertContext);
  const { alertState } = alertContext;

  // const authContext = useContext(AuthContext);
  // const { currentUser, toggleCurrentUser } = authContext;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    // toggleCurrentUser(null);
    navigate("/Login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ boxShadow: "5px 2px 13px currentColor", backgroundColor: "#ff4744", position: "fixed", width: "100%", top: "0px", zIndex: "1" }}>
        <div className="container-fluid">
          <img src={LogoImage} alt="Logo" style={{ width: "40px", height: "40px" }} />
          <h2 style={{ color: "black" }}>Notedd</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2">
              <li className="nav-item">
                <Link className={`nav-link ${localStorage["token"] ? "" : "invisible"} ${location.pathname === "/" ? "text-light" : ""} fw-bold`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${localStorage["token"] ? "" : "invisible"} ${location.pathname === "/About" ? "text-light" : ""} fw-bold`} to="/About">
                  About
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Action</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled">Disabled</Link>
                        </li> */}
            </ul>
            {localStorage["token"] ? (
              <form className="d-flex" role="search" style={{ paddingTop: "3px" }}>
                <i className="my-2 text-dark mx-2 fa-solid fa-user"></i>
                <h4 className="text-white">{localStorage["Username"]}</h4>
                <button className="mx-3 btn btn-change1 fw-bold" style={{ position: "relative", bottom: "4px" }} onClick={handleLogout}>
                  Logout
                </button>
              </form>
            ) : (
              <form className="d-flex" role="search" style={{ paddingTop: "3px" }}>
                <Link className="btn btn-change1  fw-bold mx-1" to="/Login">
                  Login
                </Link>
                <Link className="btn btn-change1 fw-bold mx-1" to="/Signup">
                  SignUp
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
      {alertState.show && <Alert />}
    </>
  );
}

export default Navbar;
