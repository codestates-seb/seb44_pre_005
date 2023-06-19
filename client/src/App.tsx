import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./page/Detail";
import User from "./page/User";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Detail />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
