import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Task from "../Components/Task";
import Notask from "../Components/Notask";
import Footer from "../Components/Footer";
import CreateTaskButton from "../Components/CreateTaskButton";
import { BASE_URL, requestConfig } from "../api/api";
import ENDPOINTS from "../api/endpoints";

let items = [];
function Userpanel(props) {
    const [responseMessage, setResponseMessage] = useState('');
  const [tasks, setTasks] = useState(items);

  /*------ Show Existing task------*/
  const getTasks = async () => {
      try {
          const response = await axios.get(BASE_URL+ ENDPOINTS.getTasks, requestConfig);
          setTasks(response.data.map((task, index) => ({ ...task, tempID: index, isNew: false })));
        } catch (err) {
          console.log(err.response.data.Error);
          setResponseMessage(err.response.data.Error);
        }
  }

  useEffect(() => {
    getTasks();
  },[]);

  /*------ Save Data of New task------*/
  const handleTaskSave = (taskId, _ID, title, description, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.tempID === taskId
          ? { ...task, tempID,_ID , title, description, completed, isNew: false }
          : task
      )
    );
  };
  
  /*------ Start Creating New task------*/
  const handleTaskCreation = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { tempID: tasks.length, title: ``, description: ``, completed: false, isNew: true }
      // New Task is always saved with completed value false
    ]);
  };
  /*------ Start Creating New task------*/


  return (
    <div className="vh-100 d-flex flex-column">
      <div className="flex-grow-1">
        <Header {...props} />
        <div className="p-5 d-flex justify-content-end">
          <CreateTaskButton handleTaskCreation={handleTaskCreation} />
        </div>
        {tasks.length === 0 ? (
          <Notask message={responseMessage ? responseMessage : 'Create some tasks'}/>
        ) : (
          tasks
            .map((task) => (
              <Task
                key={task.tempID}
                _ID={task._id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                isNew={task.isNew}
                onSave={handleTaskSave}
                getTasks={getTasks}
              />
            )).reverse()
        )}
      </div>
      <Footer />
    </div>
  );  
}
export default Userpanel;
