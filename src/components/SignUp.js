import React, { useState, useContext } from "react";
import AuthContext from "../context/user/authContext";

function SignUp() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const authcontext = useContext(AuthContext);
  const { createUser } = authcontext;

  const handleSubmit = async (element) => {
    element.preventDefault();
    createUser(user);
  };

  const handleChange = (element) => {
    setUser({ ...user, [element.target.name]: element.target.value });
  };

  return (
    <div className="container my-3 d-flex justify-content-center align-item-center">
      <h1 className="text-light" style={{ position: "absolute", top: "118px" }}>
        SignUp to continue..
      </h1>
      <form
        style={{
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          boxShadow: "40px 40px 40px rgba(0, 0, 0, 0.09)",
          backdropFilter: "blur(2.9px)",
          padding: "50px 40px",
          display: "flex",
          flexDirection: "column",
          marginTop: "141px",
        }}
        onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="mb-3">
            <label htmlFor="first_name" className="fw-bold form-label">
              First Name
            </label>
            <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="text" className="form-control text-white" id="first_name" name="first_name" aria-describedby="emailHelp" value={user.first_name} onChange={handleChange} />
          </div>
          <div className="mx-2 mb-3">
            <label htmlFor="last_name" className="fw-bold form-label">
              Last Name
            </label>
            <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="text" className="form-control text-white" id="last_name" name="last_name" aria-describedby="emailHelp" value={user.last_name} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="fw-bold form-label">
            Username
          </label>
          <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="text" className="form-control text-white" id="username" name="username" value={user.username} aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="fw-bold form-label">
            Email
          </label>
          <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="email" className="form-control text-white" id="email" name="email" value={user.email} aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="fw-bold form-label">
            Password
          </label>
          <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="password" className="form-control text-white" id="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
