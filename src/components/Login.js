import React, { useState, useContext } from "react";
import AuthContext from "../context/user/authContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const authcontext = useContext(AuthContext);
  const { loginUser } = authcontext;

  const handleSubmit = async (element) => {
    element.preventDefault();
    loginUser(user);
  };

  const handleChange = (element) => {
    setUser({ ...user, [element.target.name]: element.target.value });
  };

  return (
    <div className="container my-3 d-flex justify-content-center align-item-center">
      <h1 className="text-light" style={{ position: "absolute", top: "180px" }}>
        Let's get started!
      </h1>
      <form
        style={{
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          boxShadow: "40px 40px 40px rgba(0, 0, 0, 0.09)",
          backdropFilter: "blur(2.5px)",
          padding: "50px 40px",
          display: "flex",
          flexDirection: "column",
          marginTop: "200px",
        }}
        onSubmit={handleSubmit}>
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
          Launch
        </button>
      </form>
    </div>
  );
};

export default Login;
