import { atom } from "jotai";

export const accessTokenAtom = atom("");

export const loginAtom = atom(false);

export const userIdValue = atom(typeof window !== 'undefined' ? localStorage.getItem("userIdValue") : null);

export const isExpandValue = atom(false);

export const updateAtom = atom(false);

export const sideSelectMenu = atom("경험정리");

// 2024년부터 현재 연도 + 1년까지 상반기, 하반기 생성
const currentYear = new Date().getFullYear();

export const generatePeriods = atom((() => {
  const periods = [];
  for (let year = 2024; year <= currentYear + 1; year++) {
    periods.push({ label: `${year} 상반기`, value: `${year} 상반기` });
    periods.push({ label: `${year} 하반기`, value: `${year} 하반기` });
  }
  return periods.reverse();
})());

export const generateSupportStatuses = atom((() => [
  "지원 준비",
  "지원 완료",
  "서류 통과",
  "서류 탈락",
  "면접 통과",
  "면접 탈락",
  "최종 합격",
  "최종 탈락",
])());