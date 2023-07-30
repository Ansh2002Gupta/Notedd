import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import AuthState from "./context/user/authState";
import AlertState from "./context/alert/alertState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Router>
        <AlertState>
          <AuthState>
            <NoteState>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/About" element={<About />}></Route>
                <Route exact path="/Login" element={<Login />}></Route>
                <Route exact path="/Signup" element={<SignUp />}></Route>
              </Routes>
            </NoteState>
          </AuthState>
        </AlertState>
      </Router>
    </>
  );
}

export default App;
