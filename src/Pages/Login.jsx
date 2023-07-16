import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; **
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Login() {
  // const navigateTo = useNavigate(); **
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, formData);
      setFormData({
        email: '',
        password: ''
      })

      console.log(response.headers)
      setResponseMessage(response.data.message);
      setIsError(false);
      // navigateTo('/all-tasks'); **
    }
    catch (err) {
      setResponseMessage(err.response.data.error);
      setIsError(true);
    } finally {
      setIsLoading(false); // Reset the loading state to false when the request is complete (success or error)
    }
  };

  useEffect(() => {
    let timer;
    if (responseMessage) {
      timer = setTimeout(() => {
        setResponseMessage('');
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [responseMessage]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='vh-100 d-flex flex-column'>
      <Header />
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Form className="dark p-5 border rounded" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail-lu">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" name='email' value={formData.email} onChange={handleChange} disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword-lu">
            <Form.Label>Password</Form.Label>
            <Form.Control required autoComplete={true.toString()} type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} disabled={isLoading} />
          </Form.Group>

          {isLoading && (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {responseMessage && (
            <div className={isError ? 'text-danger py-2' : 'text-success d-flex gap-3 py-2'}>
              <h6>{responseMessage}</h6>
            </div>
          )}
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in..' : 'Login'}
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