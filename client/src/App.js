import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detail from "./page/Detail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Detail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
