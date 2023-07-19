import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoutes ({children}) {
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const token = Cookies.get('token');
    console.log(token, cookieValue);
return true ? children : <Navigate to='/login'/>
}

export default PrivateRoutes;