// 쿼리 파라미터 값을 한글 메뉴로 매핑
export const mapQueryToMenu = (menuQuery) => {
  switch (menuQuery) {
    case "experience-summary":
      return "경험정리";
    case "personal-statement":
      return "자기소개서";
    case "interview-questions":
      return "면접질문";
    default:
      return "경험정리"; // 유효하지 않은 값 처리
  }
};
