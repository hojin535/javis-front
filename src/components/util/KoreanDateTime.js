import moment from "moment";

export const KoreanDateTime = (date) => {
  if (!date) return ""; // date가 없을 경우 빈 문자열 반환

  const koreanTime = new Date(date);
  koreanTime.setUTCHours(koreanTime.getUTCHours()); // 한국 시간으로 변환

  return moment(koreanTime).format("YYYY-MM-DD HH:mm");
};
