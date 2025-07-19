"use client";

import React, {useState} from "react";
import {Box, Chip, FormControl, IconButton, Menu, MenuItem, Select, Typography,} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useRouter} from "next/navigation";
import {generateSupportStatuses, updateAtom} from "../../../app/Jotai.tsx";
import {useAtom, useAtomValue} from "jotai";
import {TransformDeadline} from "@/utils/TransformDeadline.ts";
import {useFetchData} from "@/hooks/useFetchData.tsx";

export const RecruitCard = ({
                              id,
                              title,
                              yearHalf,
                              state = "지원 준비",
                              deadline,
                              url,
                            }) => {
  const [update, setUpdate] = useAtom(updateAtom);

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(state);
  const router = useRouter();
  const supportStatus = useAtomValue(generateSupportStatuses); // `setSupportStatus` 대신 `useRecoilValue`만 사용
  const {fetchData} = useFetchData();
  // Dots menu 열기 핸들러
  const handleClick = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setAnchorEl(event.currentTarget);
  };

  // Dots menu 닫기 핸들러
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const deleteRecruit = async () => {
    try {
      await fetchData(`/Recruit/${id}`, "DELETE");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  // 삭제 메뉴 클릭 핸들러
  const handleDelete = async () => {
    console.log("삭제됨");
    await deleteRecruit();
    handleClose(); // 메뉴 닫기
  };

  //상태 변경시 통신
  const updateState = async (state) => {
    try {
      await
        fetchData(`/Recruit/state/${id}`, "PUT", {state});
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // 상태 변경 핸들러
  const handleStatusChange = async (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setStatus(event.target.value);
    await updateState(event.target.value);
  };

  // Box 클릭 핸들러
  const handleCardClick = (event) => {
    event.stopPropagation(); // 클릭 시 전파 방지
    router.push(`/recruits-page/${id}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          padding: "8px",
          marginBottom: "16px",
          backgroundColor: "#fff",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={handleCardClick} // capture 단계에서 이벤트 제어
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Vertical black bar */}
          <Box
            sx={{
              backgroundColor: "black",
              width: "5px",
              height: "60px",
              borderRadius: "5px",
              marginRight: "16px",
            }}
          />
          {/* 2024 하반기 Date Text */}
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{marginRight: "16px"}}
          >
            {yearHalf}
          </Typography>

          {/* Status Chip */}
          <Chip
            label={TransformDeadline(deadline)}
            color="primary"
            sx={{
              backgroundColor: "#000", // Black background for the chip
              color: "#00FF7F", // Light green text color
              fontWeight: "bold",
              marginRight: "16px",
            }}
          />

          {/* 공고 제목 */}
          <Typography variant="h6" sx={{fontWeight: "bold"}}>
            {title}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 지원 상태 선택 (Select) */}
          <FormControl sx={{marginRight: "16px", minWidth: 120}}>
            <Select
              variant={"outlined"}
              value={status}
              onChange={handleStatusChange}
              onClick={(event) => event.stopPropagation()} // Select 클릭 시 전파 방지
              displayEmpty
              inputProps={{"aria-label": "Without label"}}
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                minWidth: "120px", // Select 컴포넌트의 최소 너비 설정
              }}
            >
              {supportStatus.map((status, index) => (
                <MenuItem value={status} key={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dots Menu */}
          <IconButton
            onClick={(event) => {
              event.stopPropagation(); // 박스 클릭 이벤트로 전파되지 않도록 방지
              handleClick(event);
            }}
          >
            <MoreVertIcon/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={(event) => {
                event.stopPropagation(); // 메뉴 클릭 시 전파 방지
                handleDelete();
              }}
            >
              🗑️삭제
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};