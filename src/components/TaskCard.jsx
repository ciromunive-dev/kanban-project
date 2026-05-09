import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Link } from 'react-router-dom'; // Importamos Link

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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      <p className="text-gray-800 font-medium">{task.title}</p>
      
      {/* Contenedor de botones */}
      <div className="flex flex-wrap gap-2 mt-4">
        {nextStatus && (
          <button 
            onClick={() => moveTask(task.id, nextStatus)}
            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded cursor-pointer hover:bg-blue-200 transition-colors"
          >
            Avanzar ➔
          </button>
        )}
        
        <button 
          onClick={() => deleteTask(task.id)} 
          className="px-3 py-1 bg-red-500 text-white text-sm rounded cursor-pointer hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>

        {/* Opcional: Botón para retroceder la tarea (si no está en 'todo') */}
        {task.status !== 'todo' && (
          <button 
            onClick={() => previeStatus(task.id, prevStatus)}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded cursor-pointer hover:bg-gray-300 transition-colors"
          >
            Retroceder ⬅
          </button>
        )}
        
        <Link 
          to={`/tarea/${task.id}`}
          className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded cursor-pointer hover:bg-gray-50 transition-colors text-center inline-block"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;

