// src/pages/TaskDetails.jsx

import { useParams, Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

export default function TaskDetails() {
  // 1. Extraemos el 'taskId' directamente de la URL (ej. localhost:5173/tarea/123)
  const { taskId } = useParams<{ taskId: string }>(); // Indicamos que taskId es un string
  
  // 2. Traemos todas las tareas de nuestro contexto global
  const { tasks } = useTaskContext();

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
    <div className="max-w-2xl mx-auto p-6 font-sans text-gray-800">
      {/* Usamos <Link> de React Router en lugar de <a href=""> para evitar recargar la página */}
      <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">
        ← Volver al Tablero
      </Link>
      
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Detalles de la Tarea
        </h1>
        <p className="mb-3"><strong>ID:</strong> {task.id}</p>
        <p className="mb-3"><strong>Título:</strong> {task.title}</p>
        <p className="mb-3"><strong>Estado Actual:</strong> {task.status.toUpperCase()}</p>
        <p><em>Aquí podrías agregar más adelante una descripción larga, comentarios, fechas, etc.</em></p>
      </div>
    </div>
  );
}