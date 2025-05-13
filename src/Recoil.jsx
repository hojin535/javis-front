import { atom } from "recoil";

export const accessTokenAtom = atom({
  key: "accessTokenAtom",
  default: "",
});

export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});
export const userIdValue = atom({
  key: "userIdValue",
  default: localStorage.getItem("userIdValue"),
});
export const isExpandValue = atom({
  key: "isExpandValue",
  default: false,
});
export const updateAtom = atom({
  key: "update",
  default: false,
});
export const sideSelected = atom({
  key: "sideSelected",
  default: "statement",
});
export const sideSelectMenu = atom({
  key: "sideSelectMenu",
  default: "경험정리",
});

// export const selfIntroductionList = selector({
//   key: "selfIntroductionList",
//   get: async ({ get }) => {
//     try {
//       const memberId = get(memberIdValue); // memberIdValue atom에서 값을 가져옴
//       const response = await client.get(`jobPostings?memberId=${memberId}`);
//       return response.data;
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   },
// });

// 2024년부터 현재 연도 + 1년까지 상반기, 하반기 생성
const currentYear = new Date().getFullYear();

export const generatePeriods = atom({
  key: "generatePeriods", // atom의 고유한 key
  default: (() => {
    const periods = [];
    for (let year = 2024; year <= currentYear + 1; year++) {
      periods.push({ label: `${year} 상반기`, value: `${year} 상반기` });
      periods.push({ label: `${year} 하반기`, value: `${year} 하반기` });
    }
    return periods.reverse();
  })(),
});

export const generateSupportStatuses = atom({
  key: "generateSupportStatuses",
  default: (() => [
    "지원 준비",
    "지원 완료",
    "서류 통과",
    "서류 탈락",
    "면접 통과",
    "면접 탈락",
    "최종 합격",
    "최종 탈락",
  ])(),
});
