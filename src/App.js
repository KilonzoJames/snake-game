import "./styles/App.css";
import Start from "./components/Start";
import Game from "./components/Game";
import Dialog from "./components/Dialog";
import { Route, Routes } from "react-router-dom";
import "./styles/board.css";
import "./styles/Dialog.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />} />
      <Route path="/game" element={<Game />} />
      <Route path="/con" element={<Dialog />} />
    </Routes>
  );
}

export default App;
