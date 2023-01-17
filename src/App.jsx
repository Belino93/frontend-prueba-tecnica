import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import List from "./containers/List/List";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          {/* La parte cambiante es lo que contiene Routes DENTRO */}

          {/* Cada Route contendrá una vista..... */}

          <Route path={"/"} element={<List />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
