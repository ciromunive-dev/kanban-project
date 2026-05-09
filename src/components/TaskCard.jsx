import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

function TaskCard({ task}) {
  const { moveTask, previeStatus, deleteTask } = useContext(TaskContext);

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'todo') return 'in-progress';
    if (currentStatus === 'in-progress') return 'done';
    return null;
  };

  const getPrevStatus = (currentStatus) => {
    if (currentStatus === 'done') return 'in-progress';
    if (currentStatus === 'in-progress') return 'todo';
    return null;
  }

  const nextStatus = getNextStatus(task.status);
  const prevStatus = getPrevStatus(task.status);

  return (
    <div style={{ border: '1px solid gray', margin: '8px', padding: '8px', borderRadius: '4px', backgroundColor: 'white' }}>
      <p>{task.title}</p>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {nextStatus && (
          <button 
            onClick={() => moveTask(task.id, nextStatus)}
            style={{ cursor: 'pointer', padding: '4px 8px' }}
          >
            Avanzar ➔
          </button>
        )}
        
        {/* 3. Nuevo botón para eliminar la tarea */}
        <button 
          onClick={() => deleteTask(task.id)}
          style={{ cursor: 'pointer', padding: '4px 8px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Eliminar
        </button>
        {/* Opcional: Botón para retroceder la tarea (si no está en 'todo') */}
        {task.status !== 'todo' && (
          <button 
            onClick={() => previeStatus(task.id, prevStatus)}
            style={{ cursor: 'pointer', padding: '4px 8px' }}
          >
            Retroceder ⬅
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;