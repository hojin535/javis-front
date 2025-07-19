import {Box, Button, styled} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {mapMenuToQuery} from "@/utils/mapMenuToQuery.ts";
import {mapQueryToMenu} from "@/utils/mapQueryToMenu.ts";

const CountBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({isSelected}) => ({
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "5px",
  borderRadius: "30%",
  backgroundColor: isSelected ? "black" : "gray",
  color: "white",
}));


const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({isSelected}) => ({
  color: isSelected ? "black" : "gray",
  fontWeight: "bold",
  fontSize: "16px",
  marginRight: "10px",
  "&:hover": {
    background: "none",
  },
}));
// const url = ["experience-summary", "personal-statement", "interview-questions"];
const sideMenu = ["경험", "자소서", "면접"];
export const TypeMenu = ({menus = [], selectMenu, setSelectMenu}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  useEffect(() => {
    const menuFromQuery = searchParams.get("menu");
    if (menuFromQuery) {
      const selMenu = mapQueryToMenu(menuFromQuery);
      setSelectMenu(selMenu);
    }
  }, []);

  const handleMenuClick = (menuType) => {
    setSelectMenu(menuType); // 상태 업데이트
    router.push(`?menu=${mapMenuToQuery(menuType)}`); // URL 변경
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
            key={index}
            onClick={() => handleMenuClick(menu.type, index)}
            isSelected={selectMenu === menu.type}
          >
            {menu.type}
            <CountBox isSelected={selectMenu === menu.type}>
              {menu.count}
            </CountBox>
          </CustomButton>
        ))}
    </Box>
  );
};
