// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProfilePicture from './ProfilePicture';
import MenuList from './MenuList';

function SidebarMenu({ show, toggleShow, handleClose, imageSource }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const toggleShow = () => setShow((s) => !s);

  return (
    <div>
      <Button className="p-0 border-0 rounded-5" variant="primary" onClick={toggleShow} >
        <div className='rounded-circle bg-primary' style={{ padding: "3px" }}>
          <ProfilePicture onClick={toggleShow} imageDimension={{ width: "45px", height: "45px" }} imageSource={imageSource} />
        </div>
      </Button>
      <Offcanvas className="" placement='start' show={show} onHide={handleClose} backdrop={false} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className='border rounded-circle p-1'>
              <ProfilePicture imageDimension={{ width: "45px", height: "45px" }} imageSource={imageSource} />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <MenuList />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SidebarMenu;