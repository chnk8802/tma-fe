import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Userpanel from "./Pages/Userpanel";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Userprofile from "./Pages/Userprofile";
import About from "./Pages/About";
import PrivateRoutes from "./utils/PrivateRoutes";
import "./App.css";

function App() {
  /*------Show/Hide sidebar menu------*/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/all-tasks" element=
        {<PrivateRoutes>
          <Userpanel show={show} handleClose={handleClose} toggleShow={toggleShow}/>
          </PrivateRoutes>}>
        </Route>
        <Route path="/profile" element=
          {<PrivateRoutes>
              <Userprofile show={show} handleClose={handleClose} toggleShow={toggleShow} />
          </PrivateRoutes>}>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/about" element={<About show={show} handleClose={handleClose} toggleShow={toggleShow} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
