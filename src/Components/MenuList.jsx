import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from 'js-cookie';

function MenuList() {
  const navigateTo = useNavigate();
  const [activeKey, setActiveKey] = useState(false);
  const handleClick = () => {
    setActiveKey(true);
  }
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logout',{}, {withCredentials: true});
      Cookies.remove('token');
      navigateTo('/login');
    } catch (error) {
      console.log(error.response.data)
    }
}
  const handleLogoutAll = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logoutAll',{}, {withCredentials: true});
      Cookies.remove('token');
      navigateTo('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  }
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/users/me', {withCredentials: true});
      Cookies.remove('token');
      navigateTo('/login');
    } catch (error) {
      console.log(error.response.data);
    }
}

  return (
    <ListGroup id="menu-list-group" className="rounded-0 pt-5">
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="./all-tasks" onClick={handleClick}>
        All Tasks
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="./profile" onClick={handleClick}>
        Your Profile
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="./about" onClick={handleClick}>
        About
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="#logout" onClick={handleLogout}>
        Logout
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="#logout-all" onClick={handleLogoutAll}>
        Logout All Sessions
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} className='text-danger' id="list-item-delete" action href="#delete" onClick={handleDeleteUser}>
        Delete Profile
      </ListGroup.Item>
    </ListGroup>
  );
}

export default MenuList;