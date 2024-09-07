import { RecoilRoot, useRecoilState } from "recoil";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Component/common/Header";
import LoginPage from "./Component/Login/LoginPage";
import SignUp from "./Component/Login/SignUp";
import MainPage from "./Component/MainPage";
import { atom } from "recoil";
import CompanyAddForm from "./Component/CompanyAddForm/CompanyAddForm";
import ItemList from "./Component/Item/ItemList";
import Menu2 from "./Component/Menu2";
import Menu3 from "./Component/Menu3";
import Base from "./Component/Base";
import {loginAtom} from "./Recoil.jsx";

const user = localStorage.getItem("user");



export default function App() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  console.log("user", user);

  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/main" element={<MainPage />} />
          {/* 메뉴 1 */}
          <Route path="/menu1" element={<Base />} />
          <Route path="/menu1/companyAddForm" element={<CompanyAddForm />} />
          <Route path="/menu1/item/:id" element={<ItemList />} />
          {/* 메뉴2 */}
          <Route path="/menu2" element={<Menu2 />} />

          {/* 메뉴3 */}
          <Route path="/menu3" element={<Menu3 />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
