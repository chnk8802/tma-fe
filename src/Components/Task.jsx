import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Trash3, PencilSquare } from "react-bootstrap-icons";
import axios from "axios";

function Task({ tempID, _ID, title, description, completed, isNew, onSave, isError }) {
  /*------ Save data of New task------*/
  const [isEditMode, setIsEditMode] = useState(isNew);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskCompleted, setCompleted] = useState(completed);
  /*------ Save data of New task------*/

  /*------Edit task------*/
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  /*------Edit task------*/

  /*------Delete task------*/
  const handleTaskDeleted = async (_ID) => {
    console.log(_ID)
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${_ID}`, {withCredentials: true});
      console.log(response); 
    } catch (error) {
      console.log(error);
    }
  };
  /*------Delete task------*/
  /*------update task------*/
  const handleTaskUpdate = async (_ID) => {
    console.log(_ID)
    try {
      const response = await axios.patch(`http://localhost:3000/tasks/${_ID}`,{title: taskTitle, description: taskDescription, completed: taskCompleted} ,{withCredentials: true});
      console.log(response);
      setIsEditMode(false); 
    } catch (error) {
      console.log(error);
    }
  };
  /*------update task------*/


  /*------ Save data of New task------*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/tasks", {title: taskTitle, description: taskDescription, completed: taskCompleted}, {withCredentials:true});
      console.log(response);
      onSave(tempID, taskTitle, taskDescription, taskCompleted);
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  /*------ Save data of New task------*/
    return (
      <div className={`d-flex justify-content-center align-items-center py-2`}>
        <Form
          id="taskcard"
          className="row p-3 d-flex justify-content-center gap-2 border rounded w-75"
          onSubmit={handleSubmit}
        >
          <Form.Group
            className="col-11 py-1 d-flex flex-column justify-content-center"
            controlId="formBasicCheckbox"
          >
            {isEditMode ? 
            <Form.Check
              className="m-0 d-flex align-items-center gap-3 fs-3"
              type="checkbox"
              defaultChecked={completed}
              // onChange={(e) => setCompleted(e.target.value)}
            /> : <Form.Check
            className="m-0 d-flex align-items-center gap-3 fs-3"
            type="checkbox"
            defaultChecked={completed}
            onChange={(e) => setCompleted(e.target.value)}
            disabled={true}
          /> }
          </Form.Group>
          <Form.Group>
            {isEditMode ? (
              <Form.Control
                className="text-muted my-3 d-flex align-items-center"
                name="title"
                label="Task Title"
                placeholder="Enter Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            ) : (
              <Form.Label className="my-3 fs-5 fw-bold">{taskTitle}</Form.Label>
            )}
          </Form.Group>
          <Form.Group>
            {isEditMode ? (
              <Form.Control
                className="text-muted mb-3 p-2 d-flex align-items-center"
                as="textarea"
                name="description"
                placeholder="Enter Task Description"
                rows="3"
                maxLength={250}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            ) : (
              <Form.Label className="mb-3">{taskDescription}</Form.Label>
            )}
          </Form.Group>

          {/* ==== Task saving Error Display ==== */}
          {isError ? (
            <h6 className="text-danger">{"Error: Task not saved!"}</h6>
          ) : (
            <h6 className="text-success">{"Task saved!"}</h6>
          )}
          {/* ==== Task saving Error Display ==== */}

            {!isEditMode ? 
          <Form.Group> 
          <Button onClick={() => handleTaskUpdate(_ID)}>
          Update Task
          </Button>
        </Form.Group>  
          :
          <Form.Group>
            <Button type="submit">
          Save Task
          </Button>
          </Form.Group>
          }

          <Form.Group className="col d-flex gap-2 justify-content-center">
            <Form.Text className="text-muted m-0 d-flex align-items-center">
              <Button className="btn-danger pb-2" onClick={() => handleTaskDeleted(_ID)}>
                <Trash3 />
              </Button>
              <Button className="btn-primary pb-2" onClick={handleEditMode}>
                <PencilSquare />
              </Button>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }

export default Task;
