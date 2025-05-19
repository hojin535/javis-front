import {Box, Typography} from "@mui/material";
import {TypeMenu} from "../Statement/TypeMenu.jsx";
import {CardList} from "../Statement/CardList.jsx";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {sideSelectMenu} from "../../Recoil.jsx";
import {useFetchData} from "../../hooks/useFetchData.jsx";

export const LeftStatement = ({handleUpdate}) => {
  const [data, setData] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectMenu, setSelectMenu] = useRecoilState(sideSelectMenu);
  const {fetchData} = useFetchData();
  const mode = "statement";
  const fetchCount = async () => {
    const response = await fetchData(`/Card/count?mode=${mode}`);
    setMenus(response.data);
  };
  const fetchCard = async () => {
    const response = await fetchData(
      `/Card/All?mode=${mode}&type=${selectMenu}`,
    );
    setData(response.data);
  };
  useEffect(() => {
    fetchCard();
    fetchCount();
  }, [selectMenu]);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginTop: "30px",
          marginBottom: "10px",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        ✏️ 내 자소서
      </Typography>
      <Box
        sx={{
          width: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TypeMenu
          isSide={true}
          menus={menus}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
        />
      </Box>
      <Box
        className="side"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          padding: "0 20px",
          paddingRight: "10px",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        <CardList handleUpdate={handleUpdate} cardList={data} side={true}/>
      </Box>
    </>
  );
};
