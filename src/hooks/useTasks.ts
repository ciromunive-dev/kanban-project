import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Task, Status } from '../types';

export function useTasks() {
  const queryClient = useQueryClient();
  const { data: tasks = [], isLoading: loading, error } = useQuery({
    queryKey: ['kanban-tasks'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!res.ok) {
        throw new Error('No se pudieron cargar las tareas del servidor');
      }
      const data = await res.json();
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        status: item.completed ? 'done' : 'todo'
      })) as Task[];
    }
  })

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      status: 'todo'
    };
    queryClient.setQueryData(['kanban-tasks'], (oldTasks: Task[] = []) => {
      return [...oldTasks, newTask];
    });
  };

  const moveTask = (taskId: number, newStatus: Status) => {
    queryClient.setQueryData(['kanban-tasks'], (oldTasks: Task[] = []) => {
      return oldTasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
    });
  };

  const previeStatus = (taskId: number, prevStatus: Status) => {
    queryClient.setQueryData(['kanban-tasks'], (oldTasks: Task[] = []) => {
      return oldTasks.map(t => t.id === taskId ? { ...t, status: prevStatus } : t);
    });
  };

  const deleteTask = (taskId: number) => {
    queryClient.setQueryData(['kanban-tasks'], (oldTasks: Task[] = []) => {
      return oldTasks.filter(t => t.id !== taskId);
    });
  };

  return { tasks, loading, error, addTask, moveTask, deleteTask, previeStatus };
}
