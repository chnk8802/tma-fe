import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Userpanel from "./Pages/Userpanel";
import Userprofile from "./Pages/Userprofile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import PrivateRoute from "./utils/PrivateRoute";

import "./App.css";

function App() {
  /*------Show/Hide sidebar menu------*/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About show={show} handleClose={handleClose} toggleShow={toggleShow} />}/>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Userpanel show={show} handleClose={handleClose} toggleShow={toggleShow} />} />
          <Route path="profile" element={<Userprofile show={show} handleClose={handleClose} toggleShow={toggleShow}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
