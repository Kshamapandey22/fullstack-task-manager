import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: token
        }
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: token
        }
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Dashboard</h1>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="form-box">
        <input
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>My Tasks</h2>

      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <button
            className="delete-btn"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
