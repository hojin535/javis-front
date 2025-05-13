import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown.js";
import CheckIcon from "@mui/icons-material/Check.js";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { generatePeriods } from "../../../Recoil.jsx";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData.jsx";

export const PeriodSelector = ({ yearHalf }) => {
  const periods = useRecoilValue(generatePeriods); // useRecoilValue로 atom 값 가져오기
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const {fetchData}=useFetchData();
  const { id } = useParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 클릭한 아이콘을 기준으로 메뉴 띄움
  };

  useEffect(() => {
    if (yearHalf) {
      setSelectedPeriod(yearHalf);
    }
  }, [yearHalf]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateYearHalf = async (newYearHaf) => {
    try {
      await fetchData(`/Recruit/yearHalf/${id}`, "PUT", {
        yearHalf: newYearHaf,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const handleMenuItemClick = async (event, period) => {
    setSelectedPeriod(period.label); // 선택된 값 설정
    await updateYearHalf(period.label);
    setAnchorEl(null); // 메뉴 닫기
  };

  return (
    <Box>
      <Box
        sx={{
          fontSize: "12px",
          border: "1px solid #e0e0e0", // 얇은 테두리
          padding: "5px 10px", // 상하 좌우 패딩 설정
          borderRadius: "5px", // 모서리 둥글게
          backgroundColor: "#f5f5f5", // 약간의 배경색 추가
          color: "#757575", // 텍스트 색상 (회색)
          display: "flex", // 아이콘과 텍스트를 같은 줄에 배치
          alignItems: "center", // 아이콘과 텍스트 수직 정렬
          position: "relative", // 아이콘을 호버 시에 제어하기 위해 필요
          cursor: "pointer",
          marginRight: "10px",
          "&: hover .arrowIcon": {
            display: "inline-block",
          },
          "&: hover": {
            padding: "0px 0px",
            paddingLeft: "10px",
            paddingRight: "5px",
          },
        }}
        onClick={handleClick}
      >
        {selectedPeriod}
        {/* 아이콘을 클릭했을 때 메뉴를 열도록 설정 */}
        <IconButton
          onClick={handleClick}
          sx={{
            padding: "0",
            marginLeft: "2px",
            display: "none",
            transition: "visibility 0.3s ease",
          }}
          className={"arrowIcon"}
        >
          <ArrowDropDownIcon className="arrowIcon" sx={{ fontSize: "12px" }} />
        </IconButton>
      </Box>

      {/* 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {periods.map((period) => (
          <MenuItem
            key={period.value}
            onClick={(event) => handleMenuItemClick(event, period)}
            sx={{
              fontSize: "12px",
              backgroundColor:
                selectedPeriod === period.label ? "#e0e0e0" : "inherit", // 선택된 항목의 배경색 변경
              display: "flex",
              justifyContent: "space-between", // 아이콘과 텍스트 간격 설정
              color: selectedPeriod === period.label ? "blue" : "inherit", // 선택된 항목의 텍스트 색상 변경
              "&:hover": {
                backgroundColor:
                  selectedPeriod === period.label ? "#d6d6d6" : "#f0f0f0", // 호버 시 배경색을 다르게 설정
              },
            }}
          >
            {period.label}
            {selectedPeriod === period.label && (
              <CheckIcon sx={{ fontSize: "14px", marginLeft: "5px" }} /> // 선택된 항목에 체크 표시
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
