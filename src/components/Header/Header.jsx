import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginAtom, userIdValue } from "../../Recoil.jsx";
import Javis from "../../assets/LOGO.png";
import { Typography } from "@mui/material";
import { SearchComponent } from "./SearchComponent.jsx";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
const pages = [" 내정보", "내 자소서", "내 공고"];
const url = ["info", "statement", "recruits-page"];
export default function Header() {
  const navi = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdValue);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [, setAnchorEl] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("user"));
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    handleClose();
    navi("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);
  //검색
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }} style={{ zIndex: "100" }}>
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
            <img
              src={Javis}
              alt="로고"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
              }}
              onClick={() => {
                isLogin ? navi("/main") : navi("/");
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => navi(`${url[index]}`)}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ marginLeft: 1 }}>
              <SearchIcon
                onClick={() => setOpenSearch(true)}
                sx={{ justifyContent: "center", alignItems: "center" }}
              />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {isLogin && <>{/* 메뉴 버튼 추가 가능 */}</>}
          </Box>

          {isLogin && (
            <>
              <Typography style={{ color: "#ffffff", marginRight: "20px" }}>
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
          <SearchComponent setOpenSearch={setOpenSearch} />
        </Box>
      </Modal>
    </Box>
  );
}
