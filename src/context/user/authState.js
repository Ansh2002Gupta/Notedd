import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../alert/alertContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { toggleAlertState } = alertContext;
  // const [currentUser, setCurrentUser] = useState({
  //   first_name: "sample",
  //   last_name: "sample",
  //   username: "sample",
  //   email: "sample",
  //   password: "sample",
  // });
  // const toggleCurrentUser = (user) => {
  //   setCurrentUser({
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     username: user.username,
  //     email: user.email,
  //     password: user.password,
  //   });
  // };

  const createUser = async (user) => {
    const { first_name, last_name, username, email, password } = user;
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, username, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/Login");
      toggleAlertState("success", "Account creates successfully!");
    } else toggleAlertState("danger", json.error);
  };

  const loginUser = async (user) => {
    const { email, password } = user;
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const token = json.authtoken;
      localStorage.setItem("token", token);
      localStorage.setItem("Username", json.user.username);
      // toggleCurrentUser(json.user);
      navigate("/");
      toggleAlertState("success", "Login successful!");
    } else toggleAlertState("danger", json.error);
  };

  return <AuthContext.Provider value={{ createUser, loginUser }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
