import dayjs from "dayjs";

export const TransformDeadline = (deadline) => {
  const today = dayjs().startOf("day"); // 오늘 날짜를 자정으로 설정
  const deadlineDate = dayjs(deadline).startOf("day"); // 마감 날짜를 자정으로 설정
  const diff = deadlineDate.diff(today, "day"); // 날짜 차이 계산

  // 디데이 계산
  const dDay =
    diff === 0 ? "D-day" : `D${diff > 0 ? `-${diff}` : `+${Math.abs(diff)}`}`;

  return dDay; // 문자열 반환
};
