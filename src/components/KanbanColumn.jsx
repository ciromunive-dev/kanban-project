// src/components/KanbanColumn.jsx
import TaskCard from './TaskCard';

export default function KanbanColumn({ title, tasks }) {
  return (
    <div className="flex-1 min-w-[250px] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200">
        {title} <span className="text-sm font-normal text-gray-400 ml-2">({tasks.length})</span>
      </h2>
      
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {/* Un pequeño mensaje si la columna está vacía */}
        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
            No hay tareas
          </p>
        )}
      </div>
    </div>
  );
}