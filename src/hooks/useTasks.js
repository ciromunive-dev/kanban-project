import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar las tareas del servidor');
        }
        return response.json();
      })
      .then(data => {
        const apiTasks = data.map(item => ({
          id: item.id,
          title: item.title,
          status: item.completed ? 'done' : 'todo'
        }));
        setTasks(apiTasks);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      })
  }, []);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }; 
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const previeStatus = (taskId, prevStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: prevStatus }; 
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // 1. NUEVA FUNCIÓN: Eliminar usando .filter()
  const deleteTask = (taskId) => {
    // Filtramos el arreglo: nos quedamos solo con las tareas cuyo id sea diferente al id que queremos borrar
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return { tasks, loading, error, addTask, moveTask, deleteTask, previeStatus };
}
