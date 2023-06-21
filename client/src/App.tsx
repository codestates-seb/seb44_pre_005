import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./page/Detail";
import User from "./page/User";
import Footer from "./components/Footer";
import CreateQuestion from "./page/CreateQuestion";
import Main from "./page/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route
          path="/create"
          element={<CreateQuestion></CreateQuestion>}
        ></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
