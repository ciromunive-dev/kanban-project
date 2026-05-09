// src/pages/TaskDetails.jsx
import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

export default function TaskDetails() {
  // 1. Extraemos el 'taskId' directamente de la URL (ej. localhost:5173/tarea/123)
  const { taskId } = useParams();
  
  // 2. Traemos todas las tareas de nuestro contexto global
  const { tasks } = useContext(TaskContext);

  // 3. Buscamos la tarea específica. 
  // OJO: Los parámetros de la URL siempre son texto (strings), así que lo convertimos a Número
  const task = tasks.find(t => t.id === Number(taskId));

  if (!task) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Tarea no encontrada</h2>
        <Link to="/">Volver al Tablero</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Usamos <Link> de React Router en lugar de <a href=""> para evitar recargar la página */}
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        ← Volver al Tablero
      </Link>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid gray', borderRadius: '8px' }}>
        <h1>Detalles de la Tarea</h1>
        <p><strong>ID:</strong> {task.id}</p>
        <p><strong>Título:</strong> {task.title}</p>
        <p><strong>Estado Actual:</strong> {task.status.toUpperCase()}</p>
        <p><em>Aquí podrías agregar más adelante una descripción larga, comentarios, fechas, etc.</em></p>
      </div>
    </div>
  );
}