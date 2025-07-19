"use client";

import {Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AutoCompleteInput, DatePickerInput, ServiceStatusButtonGroup,} from "@/components/common/InputComponent.tsx";
import {InfoTitle} from "./InfoTitle.tsx";
import {useAlert} from "./InfoPage";
import {useFetchData} from "@/hooks/useFetchData.tsx";

export const MilitaryInfo = ({militaryInfo = []}) => {
  const [state, setState] = useState(true);
  const {showAlert} = useAlert();
  const {fetchData} = useFetchData();
  // 병역 구분
  const [serviceStatus, setServiceStatus] = useState();
  const militaryStatusOptions = ["비대상", "군필", "미필", "면제", "복무중"];

  // 군별
  const [militaryType, setMilitaryType] = useState("");
  const militaryTypeOptions = [
    "육군",
    "해군",
    "공군",
    "해병",
    "의경",
    "공익",
    "기타",
  ];

  // 군별 계급
  const [militaryRanks, setMilitaryRanks] = useState("");
  const militaryRanksOptions = [
    "이병",
    "일병",
    "상병",
    "병장",
    "하사",
    "중사",
    "상사",
    "원사",
    "준위",
    "소위",
    "중위",
    "대위",
    "소령",
    "중령",
    "대령",
  ];

  // 복무 기간
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));

  // 군별 병과
  const [militaryClasses, setMilitaryClasses] = useState("");
  const militaryClassesOptions = [
    "보병",
    "포병",
    "기갑",
    "공병",
    "통신",
    "기타",
  ];

  // 제대 구분
  const [retireMilitary, setRetireMilitary] = useState("");
  const retireMilitaryOptions = [
    "만기 제대",
    "의가 제대",
    "의병 제대",
    "전역",
    "소집 해제",
    "제적",
    "면제",
    "제대",
    "근무 연장",
    "기타",
    "중도 제대",
    "병역 면제",
  ];

  const handleSave = async () => {
    const militaryData = {
      serviceStatus,
      militaryType,
      militaryClasses,
      militaryRanks,
      startDate: startDate.isValid() ? startDate.toISOString() : "",
      endDate: endDate.isValid() ? endDate.toISOString() : "",
      retireMilitary,
    };

    try {
      await fetchData("/MilitaryInfo", "PUT", militaryData);
      showAlert("병역 정보가 성공적으로 저장되었습니다.");
      setState(true);
    } catch (error) {
      console.error("Error saving military info:", error);
      showAlert("병역 정보 저장에 실패했습니다.", "error");
    }
  };

  const changeState = () => {
    if (state) {
      setState(false);
    } else {
      handleSave();
    }
  };
  useEffect(() => {
    if (militaryInfo) {
      setServiceStatus(militaryInfo.serviceStatus || "");
      setMilitaryType(militaryInfo.militaryType || "");
      setMilitaryClasses(militaryInfo.militaryClasses || "");
      setMilitaryRanks(militaryInfo.militaryRanks || "");
      setStartDate(militaryInfo.startDate ? dayjs(militaryInfo.startDate) : null);
      setEndDate(militaryInfo.endDate ? dayjs(militaryInfo.endDate) : null);
      setRetireMilitary(militaryInfo.retireMilitary || "");
    }
  }, [militaryInfo]);
  return (
    <>
      <InfoTitle title="병역사항" state={state} setState={changeState}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* 병역구분 */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{marginTop: "5px"}}
        >
          <Grid item xs={12} sm={2}>
            <Typography>병역구분</Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <ServiceStatusButtonGroup
              options={militaryStatusOptions}
              selectedOption={serviceStatus}
              onChange={setServiceStatus}
              disabled={state}
            />
          </Grid>
        </Grid>

        {/* 군별 및 병과 */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Typography>군별</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteInput
              options={militaryTypeOptions}
              value={militaryType}
              setValue={setMilitaryType}
              disabled={state}
            />
          </Grid>
          <Grid item xs={12} sm={1}/>
          <Grid item xs={12} sm={2}>
            <Typography>병과</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteInput
              options={militaryClassesOptions}
              value={militaryClasses}
              setValue={setMilitaryClasses}
              disabled={state}
            />
          </Grid>
        </Grid>

        {/* 계급 및 복무기간 */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Typography>계급</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteInput
              options={militaryRanksOptions}
              value={militaryRanks}
              setValue={setMilitaryRanks}
              disabled={state}
            />
          </Grid>
          <Grid item xs={12} sm={1}/>
          <Grid item xs={12} sm={2}>
            <Typography>복무기간</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <DatePickerInput
              onChange={setStartDate}
              label={"시작일"}
              value={startDate}
              disabled={state}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <DatePickerInput
              onChange={setEndDate}
              label={"종료일"}
              value={endDate}
              disabled={state}
            />
          </Grid>
        </Grid>

        {/* 제대구분 */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Typography>제대구분</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteInput
              options={retireMilitaryOptions}
              value={retireMilitary}
              setValue={setRetireMilitary}
              disabled={state}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};
