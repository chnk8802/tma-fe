import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Task from "../Components/Task";
import Notask from "../Components/Notask";
import Footer from "../Components/Footer";
import CreateTaskButton from "../Components/CreateTaskButton";

let items = [];
function Userpanel(props) {
  const [tasks, setTasks] = useState(items);

  /*------ Save Data of New task------*/
  useEffect(() => {
    const getUserTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tasks`, {
              withCredentials: true,
            });
            setTasks(response.data.map((task, index) => ({ ...task, tempID: index, isNew: false })));
          } catch (err) {
            console.log(err);
          }
    }
    getUserTasks();
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
          <Notask />
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
              />
            )).reverse()
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Userpanel;
