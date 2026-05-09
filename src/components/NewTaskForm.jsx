// src/components/NewTaskForm.jsx
import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function NewTaskForm() {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all cursor-pointer"
      >
        Agregar Tarea
      </button>
    </form>
  );
}