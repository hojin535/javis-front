import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const InfoTitle = ({ title, state = false, setState }) => {
  return (
    <Box
      sx={{
        borderBottom: "2px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Title과 Button을 양쪽으로 배치
      }}
    >
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Button
        sx={{
          position: "relative",
          right: 0,
          color: "white", // 텍스트 색상
          background: "black",
          "&:hover": {
            backgroundColor: "gray", // 호버 시 연한 회색 배경
          },
        }}
        variant="outlined"
        onClick={setState}
      >
        {state ? "수정" : "저장"}
      </Button>
    </Box>
  );
};
