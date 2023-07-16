import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Trash3 } from 'react-bootstrap-icons';

function Task({ id, isError, title, description, isNew, onSave }) {

  const [isTaskDeleted, setIsTaskDeleted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(isNew);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  /*------Edit task------*/
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  /*------Edit task------*/


  /*------Delete task------*/
  const handleTaskDeleted = () => {
    setIsTaskDeleted(true);
  }
  /*------Delete task------*/


  /*------ Save data of New task------*/
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(id, taskTitle, taskDescription);
    setIsEditMode(false);
  };
  /*------ Save data of New task------*/
  if (!isTaskDeleted) {
    return (
      <div className={`d-flex justify-content-center align-items-center py-2`}>
        <Form id='taskcard' className="row p-3 d-flex justify-content-center gap-2 border rounded w-75" onSubmit={handleSubmit}>
          <Form.Group className="col-11 py-1 d-flex flex-column justify-content-center" controlId="formBasicCheckbox">

            <Form.Check className="m-0 d-flex align-items-center gap-3 fs-3" type="checkbox" />

            {isEditMode ?
              <Form.Control className="text-muted my-3 d-flex align-items-center" name='title' label="Task Title" placeholder='Enter Task Title' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
              :
              <Form.Label className='my-3 fs-5 fw-bold'>{taskTitle}</Form.Label>}

            {isEditMode ?
              <Form.Control className="text-muted mb-3 p-2 d-flex align-items-center" as="textarea" name='description' placeholder='Enter Task Description' rows="3" maxLength={250} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
              :
              <Form.Label className='mb-3'>{taskDescription}</Form.Label>}

            {/* ==== Task saving Error Display ==== */}
            {(isError) ? <h6 className='text-danger'>{"Error: Task not saved!"}</h6> : <h6 className='text-success'>{"Task saved!"}</h6>}
            {/* ==== Task saving Error Display ==== */}


            <Button onClick={handleEditMode}>
              {isEditMode ? "Save Task" : "Edit Task"}
            </Button>

          </Form.Group>
          <Form.Group className='col d-flex gap-2 justify-content-center'>
            <Form.Text className="text-muted m-0 d-flex align-items-center">
              <Button className='btn-danger pb-2' onClick={handleTaskDeleted}>
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