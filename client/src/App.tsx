import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./page/Detail";
import User from "./page/User";
import CreateQuestion from "./page/CreateQuestion";
import Main from "./page/Main";
import AnswerModifyDetail from "./page/AnswerModifyDetail";
import Join from "./page/Join";
import Login from "./page/Login";
import ModifyDetail from "./page/ModifyDetail";
import tw from "tailwind-styled-components";
import Mypage from "./page/Mypage";
import ThemeButton from "./components/Darkmode";

function App() {
  return (
    <div className="App">
      <Header />

      <Container>
        <Routes>
          <Route
            path="/answermodify/:id"
            element={<AnswerModifyDetail />}
          ></Route>
          <Route
            path="/create"
            element={<CreateQuestion></CreateQuestion>}
          ></Route>
          <Route path="/test" element={<ThemeButton></ThemeButton>}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/modifydetail/:id" element={<ModifyDetail />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/user/:id" element={<Mypage></Mypage>}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;

const Container = tw.div`
mt-12
`;
