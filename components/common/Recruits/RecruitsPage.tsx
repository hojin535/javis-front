"use client";

import {PageTitle} from "@/components/common/PageTitle.tsx";
import {BaseComponent} from "@/components/common/BaseComponent.tsx";
import {PageContent} from "@/components/common/PageContent.tsx";
import {PeriodFilter} from "./PeriodFilter.tsx";
import {Box} from "@mui/material";
import {RecruitCard} from "./RecruitCard.tsx";
import RecruitAddCardBody from "./RecruitAddCardBody.tsx";
import {AddCardComponent} from "@/components/common/Card/AddCardComponent.tsx";
import {useEffect, useState} from "react";
import {KoreanDateTime} from "@/utils/KoreanDateTime.ts";
import {useAtom} from "jotai";
import {updateAtom} from "@/app/Jotai.tsx";
import {useFetchData} from "@/hooks/useFetchData.tsx";

export const RecruitsPage = () => {
  const [show, setShow] = useState(false);
  const [update,] = useAtom(updateAtom);
  const {fetchData} = useFetchData();
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const [recruits, setRecruits] = useState([]);

  const getData = async () => {
    try {
      const response = await fetchData("/Recruit");

      // 데이터를 변환
      const transformedData = response.data.map((item) => {
        // year_half 값을 yearHalf로 변환
        const deadline = item.deadline;

        return {
          ...item, // 기존 데이터 유지
          deadline: KoreanDateTime(deadline),
        };
        // Removed the extra character 'ㅡ' here
      });

      setRecruits(transformedData); // 변환된 데이터로 상태 업데이트
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [update]);
  return (
    <BaseComponent className={"test"}>
      {/* 이모지와 제목을 한 줄로 배치 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // 수직 가운데 정렬
          gap: "10px", // 이모지와 텍스트 사이 간격 설정
        }}
      >
        {/* 이모지 크기 조정 및 수평 맞추기 */}
        <div
          style={{
            fontSize: "32px", // 이모지 크기
            verticalAlign: "middle", // 텍스트와 수평 맞추기
            alignItems: "center",
          }}
        >
          💼
        </div>
        <PageTitle title={"내 공고"} variant={"h5"}/>
      </Box>

      <PageContent>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <PeriodFilter/>
          <Box sx={{marginLeft: "auto"}}>
            <AddCardComponent
              modalBody={<RecruitAddCardBody handleClose={handleClose}/>}
              handleOpen={handleOpen}
              handleClose={handleClose}
              show={show}
            />
          </Box>
        </Box>
        <Box sx={{marginTop: "40px"}}>
          {recruits.map((recruit) => {
            return (
              <RecruitCard
                key={recruit.id}
                id={recruit.id}
                title={recruit.title}
                yearHalf={recruit.yearHalf}
                state={recruit.state}
                url={recruit.url}
                deadline={recruit.deadline}
              />
            );
          })}
        </Box>
      </PageContent>
    </BaseComponent>
  );
};