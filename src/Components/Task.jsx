import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Trash3} from "react-bootstrap-icons";
import axios from "axios";

function Task({
  tempID,
  _ID,
  title,
  description,
  completed,
  isNew,
  onSave,
  getTasks
}) {

  /*------ Show response of New task created or not------*/
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(true);

  /*------ Save data of New task------*/
  const [isEditMode, setIsEditMode] = useState(isNew);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskCompleted, setCompleted] = useState(completed);

  /*------ Save data of New task------*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          title: taskTitle,
          description: taskDescription,
          completed: taskCompleted,
        },
        { withCredentials: true }
        );
        setIsEditMode(false);
        console.log(response.data.message);
        setResponseMessage(response.data.message);
        setIsError(false)
        onSave(tempID, taskTitle, taskDescription, taskCompleted);
        getTasks();
      } catch (error) {
        if (error) {
          console.log(error.response.data.Error);
          setResponseMessage(error.response.data.Error);
          setIsError(true);
      }
    }
  };
  
  // Clear Error Message
  useEffect(() => {
    let timer;
    if (responseMessage) {
      timer = setTimeout(() => {
        setResponseMessage('');
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [responseMessage]);

  /*------Edit task------*/
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  /*------update task------*/
  const handleTaskUpdate = async (_ID) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${_ID}`,
        {
          title: taskTitle,
          description: taskDescription,
          completed: taskCompleted,
        },
        { withCredentials: true }
      );
      console.log(completed)
      console.log(response);
      setIsEditMode(false);
      setResponseMessage(response.data.message);
      setIsError(false);
      getTasks();
    } catch (error) {
      console.log(taskCompleted)
      console.log(error);
      setResponseMessage(error.response.data.Error);
      setIsError(true);
    }
  };

  /*------Delete task------*/
  const handleTaskDeleted = async (_ID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/tasks/${_ID}`,
        { withCredentials: true }
      );
      console.log(response);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

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
          {isEditMode ? (
            <Form.Check
              className="m-0 d-flex align-items-center gap-3 fs-3"
              type="checkbox"
              onChange={(e) => setCompleted(e.target.checked)}
            />
          ) : (
            <Form.Check
              className="m-0 d-flex align-items-center gap-3 fs-3"
              type="checkbox"
              disabled={true}
              defaultChecked={completed}
            />
          )}
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
            <p className="mb-3 text-break">{taskDescription}</p>
          )}
        </Form.Group>

        {/* ==== Task saving Error Display ==== */}
        {responseMessage && (
            <div className={isError ? 'text-danger py-2' : 'text-success d-flex gap-3 py-2'}>
              <h6>{responseMessage}</h6>
            </div>
          )}

          {isEditMode ? 
        <Form.Group>
        {isEditMode && isNew === true ? 
        <Button type="submit">Save Task</Button>
     : 
        <Button onClick={() => handleTaskUpdate(_ID)}>Update Task</Button>
      }
      </Form.Group>
        :
        <Form.Group>
          <Button className="btn-primary pb-2" onClick={handleEditMode}>
              Edit Task
            </Button>
        </Form.Group>
      }

        <Form.Group className="col d-flex gap-2 justify-content-center">
          {/* <Form.Text className="text-muted m-0 d-flex align-items-center"> */}
            <Button
              className="btn-danger pb-2"
              onClick={() => handleTaskDeleted(_ID)}
            >
              <Trash3 />
            </Button>
            {/* </Form.Text> */}
        </Form.Group>
      </Form>
    </div>
  );
}

export default Task;
