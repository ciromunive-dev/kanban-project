import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './pages/Board';
import TaskDetails from './pages/TaskDetails';

export default function App() {
  return(
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/tarea/:taskId" element={<TaskDetails />} />
      </Routes>
  )
}