"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {loginAtom, userIdValue} from "../../app/Jotai";
import Javis from "@/public/assets/LOGO.png";
import {Typography} from "@mui/material";
import {SearchComponent} from "./SearchComponent.tsx";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import {useLogin} from "@/hooks/useLogin";

const pages = [" 내정보", "내 자소서", "내 공고"];
const url = ["/info", "/statement", "/recruits-page"];
export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useAtom(userIdValue);
  const [isLogin, setIsLogin] = useAtom(loginAtom);
  const [, setAnchorEl] = useState(null);
  const {logout} = useLogin();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem("user"));
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await logout();
    setIsLogin(false);
    handleClose();
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, [setIsLogin]);
  //검색
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <Box sx={{flexGrow: 1}} style={{zIndex: "100"}}>
      <AppBar
        position="static"
        sx={{
          zIndex: 1300,
          background: "black",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src={Javis}
              alt="로고"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
              }}
              onClick={() => {
                isLogin ? router.push("/main") : router.push("/");
              }}
            />
            <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  sx={{my: 2, color: "white", display: "block"}}
                  onClick={() => router.push(`${url[index]}`)}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{marginLeft: 1}}>
              <SearchIcon
                onClick={() => setOpenSearch(true)}
                sx={{justifyContent: "center", alignItems: "center"}}
              />
            </Box>
          </Box>

          <Box sx={{flexGrow: 1, display: "flex"}}>
            {isLogin && <>{/* 메뉴 버튼 추가 가능 */}</>}
          </Box>

          {isLogin && (
            <>
              <Typography style={{color: "#ffffff", marginRight: "20px"}}>
                {userId}님
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "white",
                  backgroundColor: "#ff1744",
                  "&:hover": {
                    backgroundColor: "#f01440",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                로그아웃
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1500, // AppBar보다 위로
        }}
      >
        <Box
          sx={{
            width: "60vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            p: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()} // 모달 외부 클릭 닫힘 방지
        >
          <SearchComponent setOpenSearch={setOpenSearch}/>
        </Box>
      </Modal>
    </Box>
  );
}