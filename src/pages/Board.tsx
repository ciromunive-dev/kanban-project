// src/pages/Board.jsx

import { useTaskContext } from '../context/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import NewTaskForm from '../components/NewTaskForm';
import { Task } from '../types';

function Board() {
  const { tasks, loading, error } = useTaskContext();

  if (error) { 
    return  (<div className="p-8 text-red-500 text-center font-medium">
      Error: {error?.message}
      <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 active:bg-red-700 transition-colors"
      >
      Reintentar
      </button>
    </div> 
    );
  }


  if (loading) return <div className="p-8 text-gray-500 text-center text-lg animate-pulse">⏳ Cargando tu tablero...</div>;

  const todoTasks: Task[] = tasks.filter(t => t.status === 'todo');
  const inProgressTasks: Task[] = tasks.filter(t => t.status === 'in-progress');
  const doneTasks: Task[] = tasks.filter(t => t.status === 'done');

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Mi Tablero Kanban
      </h1>
      
      <NewTaskForm />

      {/* Usamos flex-col para móviles y flex-row para pantallas medianas (md) en adelante */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <KanbanColumn title="Por Hacer" tasks={todoTasks} />
        <KanbanColumn title="En Progreso" tasks={inProgressTasks} />
        <KanbanColumn title="Completado" tasks={doneTasks} />
      </div>
    </div>
  );
}

export default Board;
