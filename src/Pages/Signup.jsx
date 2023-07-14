import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header'
import Footer from '../Components/Footer';

function Signup() {

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
    try {
      const response = await axios.post('https://task-manager-dhz7.onrender.com/users', formData);
      setFormData({
        name: "",
        email: "",
        age: "",
        password: ""
      })
      setResponseMessage(response.data.message);
      setIsError(false);
    }
    catch (err) {
      setResponseMessage('Error: ' + err.message);
      setIsError(true);
    }
    console.log(formData);
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
    <div className='d-flex flex-column align-items-between vh-100'>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-grow-1'>
        <Form className="p-5 border rounded" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName-su">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" name='name' placeholder="Enter Username" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail-su">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAge-su">
            <Form.Label>Age</Form.Label>
            <Form.Control required type="number" name='age' placeholder="Enter Age" value={formData.age} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword-su">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} />
          </Form.Group>
          {responseMessage && (
            <div className={isError ? 'text-danger py-2' : 'text-success d-flex gap-3 py-2'}>
              <h6>{responseMessage}</h6>
            </div>
          )}
          <Button variant="primary" type="submit">
            Signup
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