import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used for navigation
import api from "../api/api";
import Todotoggle from "./todotoggle";
import TodoCard from "./todocard";
import "./todo.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]); // Task list state
  const [editingTask, setEditingTask] = useState(null); // Currently editing task state
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  const navigate = useNavigate(); // React Router navigation hook

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!userId) {
      navigate("/signin"); // Redirect to login page
    }
  }, [userId, navigate]);

  // Fetch tasks for the logged-in user on component mount
  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        const response = await api.get(`/list/getTasks/${userId}`);
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [userId]);

  // Add, update, and delete task functions remain the same
  const addTask = async (task) => {
    try {
      const response = await api.post("/list/addTask", {
        ...task,
        id: userId,
      });
      alert(response.data.message);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/list/updateTask`, {
        _id: id,
        ...updatedTask,
      });
      alert(response.data.message);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data.task : task))
      );
      
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/list/deleteTask`, {
        data: { taskId: id },
      });
      alert(response.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddClick = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      {tasks.length === 0 ? (
        <p className="text-center mt-5">No tasks available. Add your first task!</p>
      ) : (
        <div className="row justify-content-center align-items-center">
          {tasks.map((task) => (
            <TodoCard
              key={task._id}
              id={task._id}
              title={task.title}
              body={task.body}
              onDelete={deleteTask}
              onEdit={(id) => {
                const taskToEdit = tasks.find((task) => task._id === id);
                setEditingTask(taskToEdit);
              }}
            />
          ))}
        </div>
      )}

      <div id="Additionbutton">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          onClick={handleAddClick}
        >
          Add Task
        </button>
      </div>

      <Todotoggle
        onAddTask={addTask}
        editingTask={editingTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
}
