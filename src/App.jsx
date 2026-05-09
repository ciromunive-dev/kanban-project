import { useState, useEffect, useContext } from 'react';
import { TaskContext } from './context/TaskContext';

import NewTaskForm from './components/NewTaskForm';
import KanbanColumn from './components/KanbanColumn';
import TaskCard from './components/TaskCard';


export default function App() {
  const { tasks, loading, error } = useContext(TaskContext);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        <h2>¡Ups! Algo salió mal.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.2rem' }}>
        ⏳ Cargando tu tablero...
      </div>
    );
  }

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Mi Tablero Kanban</h1>
      <NewTaskForm />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 5. Pasamos la función deleteTask a las columnas */}
        <KanbanColumn title="Por Hacer" tasks={todoTasks} />
        <KanbanColumn title="En Progreso" tasks={inProgressTasks}/>
        <KanbanColumn title="Completado" tasks={doneTasks} />
      </div>
    </div>
  );
}