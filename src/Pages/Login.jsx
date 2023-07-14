import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Login({ isError }) {

  return (
    <div className='vh-100 d-flex flex-column'>
      <Header />
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Form className="dark p-5 border rounded" noValidate>
          <Form.Group className="mb-3" controlId="formGroupEmail-lu">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword-lu">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" />
          </Form.Group>
          {isError ? <div className="py-2">
            <h6 className='text-danger'>{"Error: Placeholer for Error!"}</h6>
          </div> :
            <div className="d-flex gap-3 py-2">
              <h6 className='text-success'>{"Log in Successfull!"}</h6>
            </div>
          }
          <Button variant="primary" type="submit">
            Login
          </Button>
          <div className="d-flex gap-2 pt-4">
            <h6 className='text-secondary'>Don't have an account?</h6>
            <b><a href="./signup" className="text-decoration-none">Signup</a></b>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;