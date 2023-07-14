import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Trash3 } from 'react-bootstrap-icons';

function Task({ isError, title, description, show, createTask, setCreateTask}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);
  const handleDeletedTask = () => {
    setIsTaskDeleted(true)
  }

  useEffect(() => {
    if (createTask) {
      setIsEditMode(true)
    }
  },[createTask])

  if (!isTaskDeleted) {
    return (
      // Change ${show ? "center" : "center"} >>>----> ${show ? "end" : "center"}
      <div className={`d-flex justify-content-${show ? "center" : "center"} align-items-center py-2`}>
        <Form id='taskcard' className="row p-3 d-flex justify-content-center gap-2 border rounded w-75">
          <Form.Group className="col-11 py-1 d-flex flex-column justify-content-center" controlId="formBasicCheckbox">

            <Form.Check className="m-0 d-flex align-items-center gap-3 fs-3" type="checkbox" />

            {isEditMode ?
              <Form.Control className="text-muted my-3 d-flex align-items-center" label="Task Title" placeholder='Enter Task Title' required />
              :
              <Form.Label className='my-3 fs-5 fw-bold'>{title}</Form.Label>}

            {isEditMode ?
              <Form.Control className="text-muted mb-3 p-2 d-flex align-items-center" as="textarea" placeholder='Enter Task Description' rows="3" maxLength={250} required />
              :
              <Form.Label className='mb-3'>{description}</Form.Label>}

            {/* ==== Task saving Error Display ==== */}
            {(isError) ? <h6 className='text-danger'>{"Error: Task not saved!"}</h6> : <h6 className='text-success'>{"Task saved!"}</h6>}
            {/* ==== Task saving Error Display ==== */}


            <Button onClick={handleEditMode}>
              {isEditMode ? "Save Task" : "Edit Task"}
            </Button>

          </Form.Group>
          <Form.Group className='col d-flex gap-2 justify-content-center'>
            <Form.Text className="text-muted m-0 d-flex align-items-center">
              <Button className='btn-danger pb-2' onClick={handleDeletedTask}>
                <Trash3 />
              </Button>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }
}


export default Task;