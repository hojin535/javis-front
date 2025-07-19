"use client";

import {Grid, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {InfoTitle} from "./InfoTitle.tsx";
import {DatePickerInput} from "@/components/common/InputComponent.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useAlert} from "./InfoPage.tsx";
import {useFetchData} from "@/hooks/useFetchData.tsx";

export const AcademicInfo = ({academicInfo}) => {
  // 완료 버튼 상태
  const [state, setState] = useState(true);
  const {showAlert} = useAlert();

  // 각 필드에 대한 상태 변수 추가
  const [schoolName, setSchoolName] = useState("");
  const [studyStartDate, setStudyStartDate] = useState(dayjs(null));
  const [studyEndDate, setStudyEndDate] = useState(dayjs(null));
  const [graduationStatus, setGraduationStatus] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [majorCredits, setMajorCredits] = useState("");
  const [acquiredCredits, setAcquiredCredits] = useState("");
  const [acquiredMajorCredits, setAcquiredMajorCredits] = useState("");
  const [remarks, setRemarks] = useState("");
  const {fetchData} = useFetchData();

  useEffect(() => {
    setSchoolName(academicInfo?.schoolName ?? "");
    setStudyStartDate(dayjs(academicInfo?.studyStartDate ?? null));
    setStudyEndDate(dayjs(academicInfo?.studyEndDate ?? null));
    setGraduationStatus(academicInfo?.graduationStatus ?? "");
    setTotalCredits(academicInfo?.totalCredits ?? "");
    setMajorCredits(academicInfo?.majorCredits ?? "");
    setAcquiredCredits(academicInfo?.acquiredCredits ?? "");
    setAcquiredMajorCredits(academicInfo?.acquiredMajorCredits ?? "");
    setRemarks(academicInfo?.remarks ?? "");
  }, [
    academicInfo?.schoolName,
    academicInfo?.studyStartDate,
    academicInfo?.studyEndDate,
    academicInfo?.graduationStatus,
    academicInfo?.totalCredits,
    academicInfo?.majorCredits,
    academicInfo?.acquiredCredits,
    academicInfo?.acquiredMajorCredits,
    academicInfo?.remarks,
  ]);
  const handleSave = async () => {
    const academicData = {
      schoolName,
      studyStartDate: studyStartDate.isValid()
        ? studyStartDate.toISOString()
        : "",
      studyEndDate: studyEndDate.isValid() ? studyEndDate.toISOString() : "",
      graduationStatus,
      totalCredits,
      majorCredits,
      acquiredCredits,
      acquiredMajorCredits,
      remarks,
    };
    try {
      await fetchData(`/AcademicInfo`, "PUT", academicData);
      showAlert("학적 정보가 성공적으로 저장되었습니다.");
      setState(true);
    } catch (error) {
      console.error("Error saving academic info:", error);
      showAlert("학적 정보 저장에 실패했습니다.", "error");
    }
  };

  const changeState = () => {
    if (state) {
      setState(false);
    } else {
      handleSave();
    }
  };

  return (
    <>
      <InfoTitle title={"학적사항"} state={state} setState={changeState}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} alignItems="center">
          {/* 학교 이름 */}
          <Grid item xs={12} sm={2}>
            <Typography>학교이름</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="학교 이름"
              margin="normal"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              disabled={state}
            />
          </Grid>

          <Grid item xs={12} sm={1}/>

          {/* 재학 기간 */}
          <Grid item xs={12} sm={2}>
            <Typography>재학기간</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <DatePickerInput
              label={"시작일"}
              value={studyStartDate}
              onChange={setStudyStartDate}
              disabled={state}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <DatePickerInput
              label={"종료일"}
              value={studyEndDate}
              onChange={setStudyEndDate}
              disabled={state}
            />
          </Grid>

          {/* 졸업 구분 */}
          <Grid item xs={12} sm={2}>
            <Typography>졸업 구분</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="구분 (졸업, 졸예, 입학, 편입 등)"
              margin="normal"
              value={graduationStatus}
              onChange={(e) => setGraduationStatus(e.target.value)}
              disabled={state}
            />
          </Grid>

          <Grid item xs={12} sm={1}/>

          {/* 전체 학점 */}
          <Grid item xs={12} sm={2}>
            <Typography>전체 학점</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="전체 학점"
              margin="normal"
              value={totalCredits}
              onChange={(e) => setTotalCredits(e.target.value)}
              disabled={state}
            />
          </Grid>

          {/* 전공 학점 */}
          <Grid item xs={12} sm={2}>
            <Typography>전공 학점</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="전공 학점"
              margin="normal"
              value={majorCredits}
              onChange={(e) => setMajorCredits(e.target.value)}
              disabled={state}
            />
          </Grid>

          <Grid item xs={12} sm={1}/>

          {/* 취득 학점 */}
          <Grid item xs={12} sm={2}>
            <Typography>취득 학점</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="취득 학점"
              margin="normal"
              value={acquiredCredits}
              onChange={(e) => setAcquiredCredits(e.target.value)}
              disabled={state}
            />
          </Grid>

          {/* 취득 전공 학점 */}
          <Grid item xs={12} sm={2}>
            <Typography>취득 전공 학점</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="취득 전공 학점"
              margin="normal"
              value={acquiredMajorCredits}
              onChange={(e) => setAcquiredMajorCredits(e.target.value)}
              disabled={state}
            />
          </Grid>

          <Grid item xs={12} sm={1}/>

          {/* 비고 */}
          <Grid item xs={12} sm={12}>
            <Typography>비고</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              placeholder="비고"
              margin="normal"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              disabled={state}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};
