"use client";

import {useEffect, useState} from "react";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {InfoTitle} from "./InfoTitle.tsx";
import {DatePickerInput} from "@/components/common/InputComponent.tsx";
import {Add, Delete} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styled from "styled-components";
import {useAlert} from "./InfoPage";
import {useFetchData} from "@/hooks/useFetchData.tsx";

const CustomButton = styled(Button)`
    background-color: black;
    color: white;
    margin-top: 30px;
    margin-bottom: -10px;

    &:hover {
        background: gray;
        color: black;
    }
`;

const AwardForm = ({formData, onUpdate, onDelete, isFirst, state}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{position: "relative", mt: isFirst ? 0 : 2}}
    >
      {!isFirst && !state && (
        <IconButton
          onClick={onDelete}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <Delete/>
        </IconButton>
      )}

      {/* 수상명 */}
      <Grid item xs={12} sm={2}>
        <Typography>수상명</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          placeholder="수상명"
          margin="normal"
          value={formData.awardName}
          onChange={(e) => onUpdate("awardName", e.target.value)}
          disabled={state}
        />
      </Grid>

      <Grid item xs={12} sm={1}/>

      {/* 수여 기관 */}
      <Grid item xs={12} sm={2}>
        <Typography>수여 기관</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          placeholder="수여 기관"
          margin="normal"
          value={formData.awardingInstitution}
          onChange={(e) => onUpdate("awardingInstitution", e.target.value)}
          disabled={state}
        />
      </Grid>

      {/* 수상 일자 */}
      <Grid item xs={12} sm={2}>
        <Typography>수상 일자</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerInput
            value={formData.awardDate}
            onChange={(date) => onUpdate("awardDate", date)}
            disabled={state}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={1}/>

      {/* 비고 */}
      <Grid item xs={12} sm={2}>
        <Typography>비고</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          placeholder="비고"
          margin="normal"
          value={formData.remarks}
          onChange={(e) => onUpdate("remarks", e.target.value)}
          disabled={state}
        />
      </Grid>

      {/* 수상 내역 */}
      <Grid item xs={12} sm={2}>
        <Typography>수상 내역</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          placeholder="수상 내역"
          margin="normal"
          multiline
          rows={4}
          value={formData.awardDetail}
          onChange={(e) => onUpdate("awardDetails", e.target.value)}
          disabled={state}
        />
      </Grid>
    </Grid>
  );
};

export const AwardsInfo = ({awardInfo = []}) => {
  const [state, setState] = useState(true);
  const {showAlert} = useAlert();
  const [forms, setForms] = useState([
    {
      id: 0,
      awardName: "",
      awardingInstitution: "",
      awardDate: null,
      remarks: "",
      awardDetails: "",
    },
  ]);
  const {fetchData} = useFetchData();
  useEffect(() => {
    if ((awardInfo && awardInfo.length > 0)) {
      // awardInfo에 id 추가하고 날짜를 dayjs 객체로 변환
      const updatedAwardInfo = awardInfo.map((item, index) => ({
        ...item,
        id: index,
        awardDate: item.awardDate ? dayjs(item.awardDate) : null,
      }));
      setForms(updatedAwardInfo);
    }
  }, [awardInfo]);

  const updateForm = (id, field, value) => {
    setForms(
      forms.map((form) => (form.id === id ? {...form, [field]: value} : form))
    );
  };

  const changeState = async () => {
    if (state) {
      setState(false);
    } else {
      const awardsData = forms.map((form) => ({
        awardName: form.awardName,
        awardingInstitution: form.awardingInstitution,
        awardDate:
          form.awardDate && form.awardDate.isValid()
            ? form.awardDate.toISOString()
            : "",
        remarks: form.remarks,
        awardDetails: form.awardDetails,
      }));

      try {
        await fetchData("/AwardInfo", "PUT", awardsData);
        showAlert("수상 정보가 성공적으로 저장되었습니다.");
        setState(true);
      } catch (error) {
        console.error("Error saving awards info:", error);
        showAlert("수상 정보 저장에 실패했습니다.", "error");
      }
    }
  };

  const addForm = () => {
    const newId =
      forms.length > 0 ? Math.max(...forms.map((f) => f.id)) + 1 : 0;
    setForms([
      ...forms,
      {
        id: newId,
        awardName: "",
        awardingInstitution: "",
        awardDate: null,
        remarks: "",
        awardDetails: "",
      },
    ]);
  };

  const deleteForm = async (id) => {
    setForms(forms.filter((form) => form.id !== id));
    await fetchData(`/AwardInfo/${id}`, "DELETE");
  };

  return (
    <>
      <InfoTitle title={"수상"} state={state} setState={changeState}/>
      {forms.map((form) => (
        <AwardForm
          key={form.id}
          formData={form}
          onUpdate={(field, value) => updateForm(form.id, field, value)}
          isFirst={forms.length === 1}
          onDelete={() => deleteForm(form.id)}
          state={state}
        />
      ))}
      {!state && (
        <CustomButton fullWidth onClick={addForm}>
          <Add sx={{color: "green", fontWeight: "bold"}}/>
          추가하기
        </CustomButton>
      )}
    </>
  );
};
