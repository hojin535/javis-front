import {useState} from "react";
import {Box, IconButton, Menu,} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko"); // ✅ 한국어로 설정
export const RecruitDeadLineCalandar = ({
                                          selectedDate,
                                          setSelectedDate,
                                          updateDeadline,
                                        }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateDeadline(date);
    handleClose();
  };

  return (
    <>
      {/* 날짜 텍스트 + 버튼 */}
      <span style={{marginRight: "8px"}}>
        <span style={{marginRight: "10px", fontWeight: "600"}}>마감일:</span>
        {selectedDate ? selectedDate.format("YYYY/MM/DD") : "없음"}
      </span>
      <IconButton onClick={handleClickOpen}>
        <CalendarMonthIcon/>
      </IconButton>

      {/* 메뉴 안에 고정 달력 넣기 */}
      <Menu
        anchorEl={anchorEl}
        open={open}
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
        <Box sx={{p: 1}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Box>
      </Menu>
    </>
  );
};
