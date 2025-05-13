import { Box } from "@mui/material";
import { LeftContainer } from "../LeftContainer/LeftContainer.jsx";
import { useRecoilState } from "recoil";
import { isExpandValue } from "../../Recoil.jsx";

export const BaseComponent = ({ children }) => {
  const [isExpanded] = useRecoilState(isExpandValue);

  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)", // 전체 뷰포트 높이로 설정
        overflow: "auto", // 불필요한 스크롤 방지
        width: "100%",
      }}
    >
      {/* Left Sidebar Container */}
      <Box
        sx={{
          width: isExpanded ? "300px" : "50px", // LeftContainer의 너비 고정
          transition: "width 0.3s ease", // 너비 변경 시 애니메이션 효과
          flexShrink: 0, // 화면이 줄어들 때 고정된 너비 유지
          position: "sticky", // 스크롤 시 상단에 고정
          top: 0, // 상단 위치 고정
          height: "calc(100vh - 64px)", // 전체 뷰포트 높이로 설정
          overflow: "visible", // 툴바가 잘리지 않도록 설정
        }}
      >
        <LeftContainer />
      </Box>

      {/* Main Content */}
      <Box
        ClassName={"MainContent"}
        sx={{
          flex: 1, // 남은 공간을 채우도록 설정
          ml: isExpanded ? 0 : "50px",
          padding: "50px 40px 0px 10px",
          height: "calc(100vh - 64px)", // 전체 뷰포트 높이로 설정
          boxSizing: "border-box", // 패딩과 함께 레이아웃이 유지되도록 설정
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
