import axios from "axios";
import React from "react";
import { Navigate, Route,Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = async () => {
    const token =Cookies.get("token");
    if (token){
        console.log(token);
    }
    const response = await axios.get("http://localhost:3000/users/validate", {withCredentials: true});
    return response.data.isValidated;
  };
  const PrivateRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
  };

export default PrivateRoute;