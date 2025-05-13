import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import LoginPage from "./components/Login/LoginPage";
import SignUp from "./components/Login/SignUp";

import "./index.css";
import { InfoPage } from "./components/Info/InfoPage.jsx";
import { RecruitsPage } from "./components/Recruits/RecruitsPage.jsx";
import { MyStatementPage } from "./components/Statement/StatementPage.jsx";
import { EditorPage } from "./components/Editor/EditorPage.jsx";
import { RecruitItemPage } from "./components/Recruits/RecruitItemPage/RecruitItemPage.jsx";

const user = localStorage.getItem("user");

export default function App() {
  console.log("user", user);
  console.log("test");
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<InfoPage />} />

          {/*  /!* 내 정보 *!/*/}
          <Route path={"/info"} element={<InfoPage />} />

          {/*  /!*내 자기소개서*!/*/}
          <Route path={"/statement"} element={<MyStatementPage />} />
          <Route path={"/statement/editor/:id"} element={<EditorPage />} />
          {/*  /!*  내 공고*!/*/}
          <Route path={"/recruits-page"} element={<RecruitsPage />} />
          <Route path={"/recruits-page/:id"} element={<RecruitItemPage />} />
          <Route
            path={"/recruits-page/:id/editor/:item"}
            element={<EditorPage />}
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
