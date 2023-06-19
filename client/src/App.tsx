import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./page/Detail";
import User from "./page/User";
import Footer from "./components/Footer";
import CreateQuestion from "./page/CreateQuestion";
import Main from "./page/Main";
import Login from "./page/Login";
import Join from "./page/Join";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Detail />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route
          path="/create"
          element={<CreateQuestion></CreateQuestion>}
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<Join />}></Route>
      </Routes>
    </div>
  );
}

export default App;
