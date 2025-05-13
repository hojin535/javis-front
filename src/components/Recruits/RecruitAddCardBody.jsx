import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // dayjs 어댑터 사용
import LinkIcon from "@mui/icons-material/Link";
import { useRecoilState } from "recoil";
import { updateAtom } from "../../Recoil.jsx";
import { useFetchData } from "../../hooks/useFetchData.jsx";

// dayjs 플러그인 활성화
dayjs.extend(customParseFormat);

const RecruitAddCardBody = ({ handleClose }) => {
  const [recruit, setRecruit] = useState("");
  const [semester, setSemester] = useState("");
  const [deadline, setDeadline] = useState(dayjs());
  const [recruitLink, setRecruitLink] = useState("");
  const currentYear = dayjs().year(); // 현재 연도
  const today = dayjs(); // 오늘 날짜
  const [update, setUpdate] = useRecoilState(updateAtom);
  const{fetchData} = useFetchData();
  // 2024년부터 현재 연도 + 1년까지 상반기, 하반기 생성
  const generatePeriods = () => {
    const periods = [];
    for (let year = 2024; year <= currentYear + 1; year++) {
      periods.push({ label: `${year} 상반기`, value: `${year} 상반기` });
      periods.push({ label: `${year} 하반기`, value: `${year} 하반기` });
    }
    return periods.reverse(); // 최신 분기부터 표시하기 위해 역순으로 정렬
  };

  // 첫 렌더링 시 첫 번째 마감 분기를 자동으로 선택
  useEffect(() => {
    const periods = generatePeriods();
    if (periods.length > 0) {
      setSemester(periods[0].value); // 첫 번째 아이템 선택
    }
  }, []); // 빈 배열로 설정하여 첫 렌더링 시 한 번만 실행

  const handleAddRecruit = async () => {
    try {
      await fetchData("/Recruit","POST", {
        title: recruit,
        yearHalf: semester,
        state: "지원 준비",
        deadline,
        url: recruitLink,
      });
      handleClose();
      setUpdate(!update);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <Typography
            color="textPrimary"
            component="div"
            sx={{ fontWeight: "600", fontSize: "16px" }}
          >
            새 공고 추가하기
          </Typography>
          <Typography
            color="textSecondary"
            component="div"
            sx={{ fontSize: "12px" }}
          >
            공고를 등록하고 정보를 모아보세요!
          </Typography>
        </Box>

        {/* 공고 제목 */}
        <Box sx={{ marginTop: "30px" }}>
          <TextField
            placeholder="공고 제목을 입력해주세요"
            fullWidth
            value={recruit}
            onChange={(e) => setRecruit(e.target.value)}
            inputProps={{ maxLength: 30 }}
            helperText={`${recruit.length}/30`}
          />
        </Box>

        {/* 상반기 / 하반기 선택 */}

        {/* 서류 마감 단계와 마감일 선택을 같은 줄에 배치 */}
        <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <TextField
            select
            label="마감 분기"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            fullWidth
          >
            {generatePeriods().map((period) => (
              <MenuItem key={period.value} value={period.value}>
                {period.label}
              </MenuItem>
            ))}
          </TextField>

          {/* 마감일 선택 */}
          <DatePicker
            label="마감일"
            value={deadline}
            onChange={(newValue) => setDeadline(newValue)}
            format="YYYY/MM/DD" // 연도/월/일 포맷
            minDate={today} // 오늘 이전 날짜 비활성화
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        {/* 공고 링크 입력 */}
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            placeholder="공고 링크를 입력해주세요"
            fullWidth
            value={recruitLink}
            onChange={(e) => setRecruitLink(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* 공고 추가하기 버튼 */}
        <Box sx={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "black", // 배경색 검정
              color: "white", // 글자색 흰색
              "&:hover": {
                backgroundColor: "darkgray", // 호버 시 색상 변경
              },
            }}
            onClick={handleAddRecruit}
          >
            공고 추가하기
          </Button>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default RecruitAddCardBody;
