import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ProfilePicture from '../Components/ProfilePicture';
import { PencilSquare } from 'react-bootstrap-icons';
import Header from '../Components/Header';
import Footer from '../Components/Footer'

function Userprofile(props) {
    let initialUserData = [
        { label: 'User Name', isEditMode: false },
        { label: 'Age', isEditMode: false },
        { label: 'Update Password', isEditMode: false }
    ];
    const [tableData, setTableData] = useState(initialUserData);

    const [adhocUpdate, setAdhoc] = useState(false);

    const handleEditClick = (index) => {
        const updatedTableData = tableData.map((data, i) =>
            i === index ? { ...data, isEditMode: true } : data
        );
        setTableData(updatedTableData);
        setAdhoc(false);
    };

    const handleAdhoc = (index) => {
        const updatedTableData = tableData.map((data, i) =>
            i === index ? { ...data, isEditMode: false } : data
        );
        setTableData(updatedTableData);
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/me', {withCredentials: true})
                const userData = response.data.user;
                initialUserData = userData;
                console.log(initialUserData)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    },[]);

    return (
        <div className=''>
            <Header {...props} />
            <div className='px-3 px-sm-5'>
                <div className='mt-5'>
                    <ProfilePicture imageDimension={{ width: "10rem", height: "10rem" }} imageSource={"https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku.jpg"} thumbnail={true} />
                    <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>{"Mark Son Goku"}</span>
                        <span className=''>{"example@email.com"}</span>
                    </div>
                </div>
                <div className='py-5'>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload New Profile Picture</Form.Label>
                            <Form.Control type='file' />
                        </Form.Group>
                    </Form>
                </div>
                <div className=''>
                    <Table >
                        <tbody>
                            {tableData.map((data, index) => (
                                <tr key={index}>
                                    <td className='fw-bold'>{data.label}</td>
                                    <td>
                                        {data.isEditMode ? (
                                            <Form className='d-flex'>
                                                <Form.Group controlId='username' className='mx-4'>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder={`Enter new ${data.label}`}
                                                    />
                                                </Form.Group>
                                                <Button
                                                    className='px-4'
                                                    variant='primary'
                                                    type='submit'
                                                    onClick={() => handleAdhoc(index)}
                                                >
                                                    save
                                                </Button>
                                            </Form>
                                        ) : (
                                            data.value
                                        )}
                                    </td>
                                    <td>
                                        <Button className='btn-primary pb-2'>
                                            <PencilSquare onClick={() => handleEditClick(index)} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Userprofile;
    