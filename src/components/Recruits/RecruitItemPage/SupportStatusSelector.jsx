import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { generateSupportStatuses } from "../../../Recoil.jsx";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown.js";
import CheckIcon from "@mui/icons-material/Check.js";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData.jsx";

export const SupportStatusSelector = ({ status }) => {
  const supportStatuses = useRecoilValue(generateSupportStatuses); // 지원 상태 리스트 가져오기
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSupportStatus, setSelectedSupportStatus] = useState(status);
  const { id } = useParams();
  const {fetchData}=useFetchData();
  useEffect(() => {
    setSelectedSupportStatus(status);
  }, [status]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 클릭한 아이콘을 기준으로 메뉴 띄움
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = async (status) => {
    try {
      await fetchData(`/Recruit/state/${id}`,"PUT", { state: status });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuItemClick = async (status) => {
    setSelectedSupportStatus(status); // 선택된 값 설정
    await updateStatus(status);
    setAnchorEl(null); // 메뉴 닫기
  };

  return (
    <Box
      sx={{
        height: "50px",
        display: "flex", // flexbox 레이아웃 설정
        alignItems: "center", // 수직 중앙 정렬
      }}
    >
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
          "&:hover .arrowIcon": {
            display: "inline-block",
          },
          "&:hover": {
            padding: "0px 0px",
            paddingLeft: "10px",
            paddingRight: "5px",
          },
        }}
        onClick={handleClick}
      >
        {selectedSupportStatus}
        {/* 아이콘을 클릭했을 때 메뉴를 열도록 설정 */}
        <IconButton
          sx={{
            padding: "0",
            marginLeft: "2px",
            visibility: "visible",
            transition: "visibility 0.3s ease",
          }}
          className="arrowIcon"
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
        {supportStatuses.map((status, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(status)} // status 값을 전달
            sx={{
              fontSize: "12px",
              backgroundColor:
                selectedSupportStatus === status ? "#e0e0e0" : "inherit", // 선택된 항목의 배경색 변경
              display: "flex",
              justifyContent: "space-between", // 아이콘과 텍스트 간격 설정
              color: selectedSupportStatus === status ? "blue" : "inherit", // 선택된 항목의 텍스트 색상 변경
              "&:hover": {
                backgroundColor:
                  selectedSupportStatus === status ? "#d6d6d6" : "#f0f0f0", // 호버 시 배경색을 다르게 설정
              },
            }}
          >
            {status} {/* status.label 대신 status 값 자체를 사용 */}
            {selectedSupportStatus === status && (
              <CheckIcon sx={{ fontSize: "14px", marginLeft: "5px" }} /> // 선택된 항목에 체크 표시
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
