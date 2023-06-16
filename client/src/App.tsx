import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>{/* <Route path="/" element={<Detail />}></Route> */}</Routes>
    </div>
  );
}

export default App;
