import './App.css';
import Start from '../Start';
import Game from '../Game';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
