import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";

export const AutoResizeInput = ({ value, onChange, color, ...props }) => {
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const calculateWidth = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // 실제 입력 필드의 폰트 스타일 가져오기
      const computedStyle = getComputedStyle(inputRef.current);
      const fontSize = computedStyle.fontSize;
      const fontWeight = computedStyle.fontWeight;
      const fontFamily = computedStyle.fontFamily;

      // 폰트 스타일을 canvas에 적용
      context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

      // 텍스트 길이 계산
      const textWidth = context.measureText(value || "").width;
      setInputWidth(textWidth + 10);
    };

    calculateWidth();
  }, [value]);

  return (
    <TextField
      {...props}
      value={value}
      hiddenLabel
      onChange={(e) => onChange(e.target.value)}
      inputRef={inputRef} // input 필드 참조 설정
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // 기본 아웃라인 제거
          },
          "&:hover fieldset": {
            backgroundColor: "#bebfc0",
            borderRadius: "12px",
            zIndex: "-10",
          },
          "&.Mui-focused fieldset": {
            border: "2px solid black", // 포커스 상태에서 아웃라인 표시
            borderRadius: "12px",
          },
        },
        "& .MuiInputBase-input": {
          color: color,
          fontSize: "20px", // 텍스트 크기
          fontWeight: "bold", // 텍스트 굵기
          padding: "10px",
          width: `${inputWidth}px`, // 동적으로 계산된 width 적용
          transition: "width 0.2s", // 부드럽게 width 변경
        },
      }}
    />
  );
};
