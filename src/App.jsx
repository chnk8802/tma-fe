import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Userpanel from "./Pages/Userpanel";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Userprofile from "./Pages/Userprofile";
import About from "./Pages/About";
import './App.css'

function App() {
  /*------Show/Hide sidebar menu------*/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  /*------Show/Hide sidebar menu------*/

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/all-tasks" element={<Userpanel show={show} handleClose={handleClose} toggleShow={toggleShow} imageSource={"https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku.jpg"} />}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/about" element={<About show={show} handleClose={handleClose} toggleShow={toggleShow} imageSource={"https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku.jpg"} />}></Route>
        <Route path="/profile" element={<Userprofile show={show} handleClose={handleClose} toggleShow={toggleShow} imageSource={"https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku.jpg"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App
