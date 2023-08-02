import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoutes({ children }) {
  const [token, setToken] = useState('');
  const d = [];
    const getCookie = () => {
      try {
        const cookieToken = Cookies.get('token');
        // console.log(cookieToken);
        setToken(cookieToken);
      } catch (error) {
        console.error('Error while getting cookies', error);
      }
    }
    useEffect(() => {
    getCookie();
    // console.log(token);
  },[token])
  return true ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
