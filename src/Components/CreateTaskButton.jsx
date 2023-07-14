import Button from 'react-bootstrap/Button';

function CreateTaskButton(props) {
  return (
    <div>
      <Button variant="primary" onClick={props.handleTaskCreation}>Create New Task</Button>
    </div>
  );
}

export default CreateTaskButton;