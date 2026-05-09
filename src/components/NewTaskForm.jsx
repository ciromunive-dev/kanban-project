import { useState } from 'react';

function NewTaskForm({ addTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
      <input
        type="text"
        placeholder="Escribe una nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '8px', marginRight: '10px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
        Agregar Tarea
      </button>
    </form>
  );
}

export default NewTaskForm;