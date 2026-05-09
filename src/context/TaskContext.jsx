import { createContext } from 'react';
import { useTasks } from '../hooks/useTasks'; // Importamos tu Custom Hook

// 1. Creamos el contexto (El portal)
export const TaskContext = createContext();

// 2. Creamos el Proveedor
// Este componente envolverá nuestra aplicación y le inyectará los datos del hook
export function TaskProvider({ children }) {
  const taskData = useTasks(); // Ejecutamos todo tu hook aquí

  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  );
}