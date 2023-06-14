import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./page/Detail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
