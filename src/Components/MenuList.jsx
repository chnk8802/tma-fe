import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function MenuList() {
  const [activeKey, setActiveKey] = useState(false);
  const handleClick = () => {
    setActiveKey(true);
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
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="#logout" onClick={handleClick}>
        Logout
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} action href="#logout-all" onClick={handleClick}>
        Logout All Sessions
      </ListGroup.Item>
      <ListGroup.Item activekey={activeKey ? "active" : ""} className='text-danger' id="list-item-delete" action href="#delete" onClick={handleClick}>
        Delete Profile
      </ListGroup.Item>
    </ListGroup>
  );
}

export default MenuList;