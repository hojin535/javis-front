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
import {PrivateRoute} from "./components/PrivateRoute.jsx";


export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<PrivateRoute><InfoPage /></PrivateRoute>} />

          {/*  /!* 내 정보 *!/*/}
          <Route path={"/info"} element={<PrivateRoute><InfoPage /> </PrivateRoute>} />

          {/*  /!*내 자기소개서*!/*/}
          <Route path={"/statement"} element={ <PrivateRoute><MyStatementPage /></PrivateRoute>} />
          <Route path={"/statement/editor/:id"} element={<PrivateRoute><EditorPage /></PrivateRoute>} />
          {/*  /!*  내 공고*!/*/}
          <Route path={"/recruits-page"} element={<PrivateRoute><RecruitsPage /></PrivateRoute>} />
          <Route path={"/recruits-page/:id"} element={<PrivateRoute><RecruitItemPage /></PrivateRoute>} />
          <Route
            path={"/recruits-page/:id/editor/:item"}
            element={<PrivateRoute><EditorPage /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
