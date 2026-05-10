import { createContext, ReactNode, useContext } from 'react';
import { useTasks } from '../hooks/useTasks'; // Importamos tu Custom Hook
import { Task, Status } from '../types';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  addTask: (title: string) => void;
  moveTask: (taskId: number, newStatus: Status) => void;
  deleteTask: (taskId: number) => void;
  previeStatus: (taskId: number, prevStatus: Status) => void;
}

// 1. Creamos el contexto (El portal)
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

// 2. Creamos el Proveedor
// Este componente envolverá nuestra aplicación y le inyectará los datos del hook
export function TaskProvider({ children }: TaskProviderProps) {
  const taskData = useTasks(); // Ejecutamos todo tu hook aquí

  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }

  return context;
}