import { Box } from "@mui/material";

export const BaseComponent = ({ children }) => {
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
      {/* Main Content */}
      <Box
        ClassName={"MainContent"}
        sx={{
          flex: 1, // 남은 공간을 채우도록 설정
          padding: "50px 40px 0px 40px",
          height: "calc(100vh - 64px)", // 전체 뷰포트 높이로 설정
          boxSizing: "border-box", // 패딩과 함께 레이아웃이 유지되도록 설정
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
