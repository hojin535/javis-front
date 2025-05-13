import { Box, Button, styled } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { mapMenuToQuery } from "../util/mapMenuToQuery.js";
import { mapQueryToMenu } from "../util/mapQueryToMenu.js";

const CountBox = styled(Box)(({ isSide, isSelected }) => ({
  width: isSide ? "24px" : "24px", // 정사각형 너비
  height: isSide ? "24px" : "24px", // 정사각형 높이
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: isSide ? "5px" : "5px",
  borderRadius: "30%", // 원형 모양
  backgroundColor: isSelected ? "black" : "gray",
  color: "white",
}));

const CustomButton = styled(Button)(({ isSelected, isSide }) => ({
  color: isSelected ? "black" : "gray",
  fontWeight: "bold",
  fontSize: isSide ? "16px" : "18px",
  marginRight: isSide ? "10px" : "10px",
  "&:hover": {
    background: "none",
  },
}));
// const url = ["experience-summary", "personal-statement", "interview-questions"];
const sideMenu = ["경험", "자소서", "면접"];
export const TypeMenu = ({ menus=[], selectMenu, setSelectMenu, isSide }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const menuFromQuery = searchParams.get("menu");
    console.log("선택한 메뉴", selectMenu);
    if (menuFromQuery) {
      const selMenu = mapQueryToMenu(menuFromQuery);
      setSelectMenu(selMenu);
    }
  }, []);

  const handleMenuClick = (menuType, index) => {
    setSelectMenu(menuType); // 상태 업데이트
    !isSide && navigate(`?menu=${mapMenuToQuery(menuType)}`); // URL 변경
  };
  return (
    <Box
      sx={{
        visibility: menus.length === 0 ? "hidden" : "visible",
        display: "flex-box",
      }}
    >
      {menus.length > 0 &&
        menus.map((menu, index) => (
          <CustomButton
            side={isSide}
            key={index}
            onClick={() => handleMenuClick(menu.type, index)}
            isSelected={selectMenu === menu.type}
          >
            {isSide ? sideMenu[index] : menu.type}
            <CountBox isSelected={selectMenu === menu.type} isSide={isSide}>
              {menu.count}
            </CountBox>
          </CustomButton>
        ))}
    </Box>
  );
};
