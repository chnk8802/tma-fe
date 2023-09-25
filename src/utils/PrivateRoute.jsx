import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null); // Use state to track authentication status

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get("token");
      if (token) {
        const _data = { token: token };
        try {
          const response = await axios.post(
            "http://localhost:3000/users/validate",
            _data,
            { withCredentials: true }
          );
          console.log(response)
          setAuthenticated(response.data.isValidated);
        } catch (error) {
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Call the function once when the component mounts

  if (authenticated === null) {
    // While authentication status is being determined, you can show a loading spinner or message
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
