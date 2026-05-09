import TaskCard from './TaskCard';

function KanbanColumn({ title, tasks, moveTask, previeStatus, deleteTask }) {
  return (
    <div style={{ flex: 1, border: '1px solid black', margin: '10px', padding: '10px', backgroundColor: '#f4f4f4' }}>
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          moveTask={moveTask} 
          previeStatus={previeStatus}
          deleteTask={deleteTask} 
        />
      ))}
    </div>
  );
}

export default KanbanColumn;