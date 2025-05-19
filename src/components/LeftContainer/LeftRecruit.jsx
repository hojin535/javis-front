import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IntroductionList from "./IntroductionList.jsx";
import { useFetchData } from "../../hooks/useFetchData.jsx";

export const LeftRecruit = ({ handleUpdate }) => {
  const [data, setData] = useState([]);
  const {fetchData} = useFetchData();
  const fetchRecruitData = async () => {
    try {
      const response = await fetchData("/Recruit/side");
    setData(response.data||[]);
  }catch (error) {
    console.error("Error fetching data:", error);
  }
  };
  useEffect(() => {
    fetchRecruitData();
  }, []);
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
        💼 내 공고
      </Typography>
      <Box
        className="side"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          padding: "0 10px",
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
        {data.map((item, index) => (
          <IntroductionList
            recruitId={item.id}
            item={item}
            key={item.id}
            index={index}
            handleUpdate={handleUpdate}
          />
        ))}
      </Box>
    </>
  );
};
