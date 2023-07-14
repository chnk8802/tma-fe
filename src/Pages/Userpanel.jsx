
import { useState } from 'react';
import Header from '../Components/Header';
import Task from '../Components/Task';
import Footer from '../Components/Footer';
import CreateTaskButton from '../Components/CreateTaskButton';

const items = [
//     {
//     id: 1,
//     title: "Title 1",
//     description: "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit dapibus lorem quis blandit. Sed interdum ultrices auctor. Curabitur maximus orci a ultrices fringilla. Suspendisse molestie urna rutrum fermentum sodales. Nullam sodales dui."
// }, {
//     id: 2,
//     title: "Title 2",
//     description: "Description 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit dapibus lorem quis blandit. Sed interdum ultrices auctor. Curabitur maximus orci a ultrices fringilla. Suspendisse molestie urna rutrum fermentum sodales. Nullam sodales dui."
// },
// {
//     id: 3,
//     title: "Title 3",
//     description: "Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit dapibus lorem quis blandit. Sed interdum ultrices auctor. Curabitur maximus orci a ultrices fringilla. Suspendisse molestie urna rutrum fermentum sodales. Nullam sodales dui."
// },
// {
//     id: 4,
//     title: "Title 4",
//     description: "Description 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit dapibus lorem quis blandit. Sed interdum ultrices auctor. Curabitur maximus orci a ultrices fringilla. Suspendisse molestie urna rutrum fermentum sodales. Nullam sodales dui."
// }
];


function Userpanel(props) {
    const [tasks, setTasks] = useState(items.reverse())
    const [createTask, setCreateTask] = useState(false);
    const handleTaskCreation = () => {
      setCreateTask(true);
      setTasks((prevTasks) => 
        [...prevTasks, {id: tasks.length + 1, title: "", description: ""}]
      );
    };

    return (
        <div className="vh-100 d-flex flex-column">
            <div className='flex-grow-1'>
                <Header {...props} />
                <div className='p-5 d-flex justify-content-end'>
                <CreateTaskButton handleTaskCreation={handleTaskCreation}/>
                </div>
                {tasks.length !== 0 ?
                    tasks.map((task) => (<Task key={task.id} title={task.title} description={task.description} show={props.show} createTask={createTask} setCreateTask={setCreateTask}/*isEditMode={isEditMode} handleEditMode={handleEditMode}*//>))
                :  
                <div className=''>
                    {createTask ? <Task key={"task.id"} title={"task.title"} description={"task.description"} show={props.show} createTask={createTask} setCreateTask={setCreateTask} /*isEditMode={isEditMode} handleEditMode={handleEditMode}*//> : 
                    <div className="h-50 d-flex justify-content-center">
                        <p>No tasks created yet. Create a task</p>
                    </div>
                    }
                </div>}
            </div>
            <Footer />
        </div>
    );
}
export default Userpanel; 