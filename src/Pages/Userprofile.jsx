import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ProfilePicture from '../Components/ProfilePicture';
import { PencilSquare } from 'react-bootstrap-icons';
import Header from '../Components/Header';
import Footer from '../Components/Footer'

function Userprofile(props) {
    const initialData = [
        { label: 'User Name', value: 'Mark Son Goku', isEditMode: false },
        { label: 'Age', value: '20', isEditMode: false },
        { label: 'Update Password', value: '********', isEditMode: false },
        { label: 'Update Password', value: '', isEditMode: false },
    ];

    const [tableData, setTableData] = useState(initialData);
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
        setAdhoc(true);
    };


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
                            <Form.Control type="file" />
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

// import { useState } from 'react';
// import ProfilePicture from '../Components/ProfilePicture';
// import Form from 'react-bootstrap/esm/Form';

// function Userprofile() {
//     const [isEditMode, setIsEditMode] = useState(false);
//     const handleEditMode = () => {
//         setIsEditMode(!isEditMode);
//     };
//     return (
//         <div className='d-flex flex-column justify-content-center'>
//             <div className='p-5'>
//                 <ProfilePicture imageDimension={{ width: "10rem", height: "10rem" }} imageSource={"https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku.jpg"} thumbnail={true} />
//             </div>
//         </div>
//     );
// }

// export default Userprofile;