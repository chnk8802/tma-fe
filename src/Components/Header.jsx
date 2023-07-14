import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SidebarMenu from './SidebarMenu';


function Header(props) {
  return (
    <div className='sticky-top'>
      {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 p-3">
          <Container fluid>
            <div></div>
            <Navbar.Brand className='fs-4 fw-bold text-primary' href="./">Task Manager App</Navbar.Brand>
            <SidebarMenu {...props} />
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default Header;