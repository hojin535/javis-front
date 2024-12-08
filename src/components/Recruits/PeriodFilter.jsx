import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const PeriodFilter = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("모든 공고");

  // 현재 연도 계산
  const currentYear = new Date().getFullYear();

  // 2024년부터 현재 연도 + 1년까지 상반기, 하반기 생성
  const generatePeriods = () => {
    const periods = [];
    for (let year = 2024; year <= currentYear + 1; year++) {
      periods.push({ label: `${year} 상반기`, value: `${year}-H1` });
      periods.push({ label: `${year} 하반기`, value: `${year}-H2` });
    }
    return periods.reverse();
  };

  // 변경 핸들러
  const handleChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // 이모지와 Select를 수직으로 가운데 정렬
        gap: "10px", // 이모지와 Select 간의 간격 설정
      }}
    >
      <div
        style={{
          fontSize: "20px", // 이모지 크기
          verticalAlign: "middle", // 텍스트와 수평 맞추기
          alignItems: "center",
        }}
      >
        ⏰
      </div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedPeriod}
        onChange={handleChange}
        // 테두리 제거를 위한 sx 스타일 추가
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          minWidth: "120px", // Select 컴포넌트의 최소 너비 설정
        }}
      >
        {/* 첫 번째 옵션으로 "모든 공고" 추가 */}
        <MenuItem value="모든 공고">모든 공고</MenuItem>
        {generatePeriods().map((period, index) => (
          <MenuItem key={index} value={period.value}>
            {period.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
