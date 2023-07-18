import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Task from '../Components/Task';
import Notask from '../Components/Notask';
import Footer from '../Components/Footer';
import CreateTaskButton from '../Components/CreateTaskButton';

let items_1 = [];
// const handleSubmit = async () => {

//   };

const items = [
    // {
    //     id: 1,
    //     title: "Title 1",
    //     description: "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit dapibus lorem quis blandit. Sed interdum ultrices auctor. Curabitur maximus orci a ultrices fringilla. Suspendisse molestie urna rutrum fermentum sodales. Nullam sodales dui."
    // },
    // {
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
console.log(items);

function Userpanel(props) {
    const [tasks, setTasks] = useState(items);

    const g = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tasks`, {withCredentials : true});
            setTasks(response.data.map(task => ({ ...task, isNew: false })));
        }
        catch (err) {
            console.log(err)
        }
    }
    g();

    /*------ Start Creating New task------*/
    const handleTaskCreation = () => {
        setTasks((prevTasks) =>
            [...prevTasks, { id: tasks.length + 1, title: ``, description: ``, isNew: true }]
        );
    };
    /*------ Start Creating New task------*/

    /*------ Save data of New task------*/
    const handleTaskSave = (taskId, title, description) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title, description, isNew: false } : task
            )
        );
    };
    /*------ Save data of New task------*/

    return (
        <div className="vh-100 d-flex flex-column">
            <div className='flex-grow-1'>
                <Header {...props} />
                <div className='p-5 d-flex justify-content-end'>
                    <CreateTaskButton handleTaskCreation={handleTaskCreation} />
                </div>
                {tasks.length === 0 ?
                    <Notask />
                    :
                    tasks.map((task) => (<Task key={task._id} title={task.title} description={task.description} isNew={task.isNew} onSave={handleTaskSave} />)).reverse()
                }
            </div>
            <Footer />
        </div>
    );
}
export default Userpanel;
