import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoutes({ children }) {
//   const token = Cookies.get("token");
//   console.log(token);
  return true ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
