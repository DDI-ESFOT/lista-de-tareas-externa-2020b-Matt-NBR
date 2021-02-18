import {useState, useEffect} from "react";
import "../Styles/TaskList.css";

const TaskList = () => {
    const [userData, setUserData] = useState([]);
    const [userTasks, setUserTasks] = useState([]);
    var [userNum, setUserNum] = useState(1);
    var [numId, setNumId] = useState(201);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/' + userNum)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                console.log(dataJson);
                setUserData(dataJson);
            });
    }, [userNum] );

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/' + userNum + '/todos')
            .then((tasks) => {
                return tasks.json();
            })
            .then((tasksJson) => {
                setUserTasks(tasksJson);
            });
    }, [userNum] );

    const handleDeleteTask = (id) => {
        console.log(id, " id de tarea eliminada");
        const updatedTasks = userTasks.filter((task) => task.id !== id);
        setUserTasks((userTasks) => {
            return [...updatedTasks];
        });
    }

    const handlePrevUser = (id) => {
        if ((id > 1) && (id <= 10)) {
            setUserNum(userNum - 1);
            console.log(userNum);
        }
    }

    const handleNextUser = (id) => {
        if ((id >= 1) && (id < 10)) {
            setUserNum(userNum + 1);
            console.log(userNum);
        }
    }

    const handleAddTask = (event) => {
        const taskToAdd = document.querySelector("#task").value;
        const newTask = {
            title: taskToAdd,
            id: numId,
            completed: false 
        }
        setNumId(numId + 1);
        setUserTasks((prevUserTasks) => {
            return [...prevUserTasks, newTask]
        });
        document.querySelector("#task").value = '';
    }

    const handleCompleteTask = (id, title) => {
        handleDeleteTask(id);
        const replaceTask = {
            title: title,
            id: id,
            completed: true
        } 
        setUserTasks((prevUserTasks) => {
            return [replaceTask, ...prevUserTasks]
        });      
    }

    return (
        <>
            <button disabled={userData.id == 1} onClick={() => handlePrevUser(userData.id)}>Anterior Usuario</button>
            <button disabled={userData.id == 10} onClick={() => handleNextUser(userData.id)}>Siguiente Usuario</button>
            <h1>Informacion del Usuario</h1>
            <ul>
                <li><b>Nombre: </b>{userData.name}</li>
                <li><b>Usuario: </b>{userData.username}</li>
                <li><b>Email: </b>{userData.email}</li>
                <li><b>Web: </b>{userData.website}</li>
                <li><b>Telefono: </b>{userData.phone}</li>
            </ul>
            Tarea
            <input type="text" id="task" placeholder="Ingrese una tarea"/>
            <button onClick={() => handleAddTask()}>Agregar tarea</button>
            <h1>Lista de Tareas ({userTasks.length} en total)</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {userTasks.map(task => 
                        <tr key={task.id}> 
                            <td>{task.title}</td>
                            <td>
                                {task.completed ?  
                                    <p id="completed">Completada</p>
                                    :
                                    <button id="incomplete" onClick={() => handleCompleteTask(task.id, task.title)}>Marcar como completada</button>
                                }
                            </td>
                            <td><button onClick={() => handleDeleteTask(task.id)}>Eliminar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;