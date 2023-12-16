import { Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import Main from "./components/Main";
import Dialog from "./components/Dialog";
import "./styles/App.css";
import "./styles/start.css";
import "./styles/board.css";
import "./styles/dialog.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />} />
      <Route path="/main" element={<Main />} />
      <Route path="/dlg" element={<Dialog />} />
    </Routes>
  );
}

export default App;
