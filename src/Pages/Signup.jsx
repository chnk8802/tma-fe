import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header'
import Footer from '../Components/Footer';
import { BASE_URL, requestConfig } from '../api/api';
import ENDPOINTS from '../api/endpoints';

function Signup() {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(BASE_URL + ENDPOINTS.signup, formData, requestConfig);
      setFormData({
        name: '',
        email: '',
        age: '',
        password: ''
      });
      setResponseMessage(response.data.message);
      setIsError(false);
      navigateTo('/login');
    }
    catch (err) {
      setResponseMessage(err.response.data.error);
      setIsError(true);
    } finally {
      setIsLoading(false); // Reset the loading state to false when the request is complete (success or error)
    }
  };
// Clear Error Message
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
    <div className='d-flex flex-column align-items-between vh-100'>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-grow-1'>
        <Form className="p-5 border rounded" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName-su">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" name='name' placeholder="Enter Username" value={formData.name} onChange={handleChange} disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail-su">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleChange} disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAge-su">
            <Form.Label>Age</Form.Label>
            <Form.Control required type="number" name='age' placeholder="Enter Age" value={formData.age} onChange={handleChange} disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword-su">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} disabled={isLoading} />
          </Form.Group>

          {/* Show loader if loading state is true */}
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center mb-4">
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
            {isLoading ? 'Signing up...' : 'Signup'}
          </Button>
          <div className="d-flex gap-2 pt-4">
            <h6 className='text-secondary'>Don't have an account?</h6>
            <b><a href="./login" className="text-decoration-none">Login</a></b>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;