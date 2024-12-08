export const mapMenuToQuery = (menu) => {
  switch (menu) {
    case "경험정리":
      return "experience-summary";
    case "자기소개서":
      return "personal-statement";
    case "면접질문":
      return "interview-questions";
    default:
      return "experience-summary"; // 유효하지 않은 값 처리
  }
};
