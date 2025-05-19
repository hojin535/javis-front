import {useEffect, useState} from "react";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {InfoTitle} from "./InfoTitle.jsx";
import {DatePickerInput} from "../common/InputComponent.jsx";
import {Add, Delete} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styled from "styled-components";
import {useAlert} from "./InfoPage";
import {useFetchData} from "../../hooks/useFetchData.jsx";

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

const ClubForm = ({formData, onUpdate, onDelete, isFirst, state}) => {
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

      {/* 동아리/대외활동명 */}
      <Grid item xs={12} sm={2}>
        <Typography>동아리/대외활동명</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          placeholder="동아리/대외활동명"
          margin="normal"
          value={formData.clubName}
          onChange={(e) => onUpdate("clubName", e.target.value)}
          disabled={state}
        />
      </Grid>

      <Grid item xs={12} sm={1}/>

      {/* 역할 */}
      <Grid item xs={12} sm={2}>
        <Typography>역할</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          placeholder="역할"
          margin="normal"
          value={formData.role}
          onChange={(e) => onUpdate("role", e.target.value)}
          disabled={state}
        />
      </Grid>

      {/* 활동 기간 */}
      <Grid item xs={12} sm={2}>
        <Typography>활동 기간</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerInput
            value={formData.startDate}
            onChange={(date) => onUpdate("startDate", date)}
            disabled={state}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={1}>
        <Typography align="center">~</Typography>
      </Grid>

      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerInput
            value={formData.endDate}
            onChange={(date) => onUpdate("endDate", date)}
            disabled={state}
          />
        </LocalizationProvider>
      </Grid>

      {/* 비고 */}
      <Grid item xs={12} sm={12}>
        <Typography>비고</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="비고"
          margin="normal"
          value={formData.remarks}
          onChange={(e) => onUpdate("remarks", e.target.value)}
          disabled={state}
        />
      </Grid>
    </Grid>
  );
};

export const ClubInfo = ({clubInfo}) => {
  const [state, setState] = useState(true);
  const {fetchData} = useFetchData();
  const {showAlert} = useAlert();
  const [forms, setForms] = useState([
    {
      id: 0,
      clubName: "",
      role: "",
      startDate: null,
      endDate: null,
      remarks: "",
    },
  ]);

  const updateForm = (id, field, value) => {
    setForms(
      forms.map((form) => (form.id === id ? {...form, [field]: value} : form))
    );
  };
  useEffect(() => {
    if (clubInfo && clubInfo.length > 0) {
      // clubInfo에 id 추가하고 날짜를 dayjs 객체로 변환
      const updatedClubInfo = clubInfo.map((item, index) => ({
        ...item,
        id: index,
        startDate: item.startDate ? dayjs(item.startDate) : null,
        endDate: item.endDate ? dayjs(item.endDate) : null,
      }));
      setForms(updatedClubInfo);
    }
  }, [clubInfo]);

  const changeState = async () => {
    if (state) {
      setState(false);
    } else {
      const clubData = forms.map((form) => ({
        clubName: form.clubName,
        role: form.role,
        startDate:
          form.startDate && form.startDate.isValid()
            ? form.startDate.toISOString()
            : "",
        endDate:
          form.endDate && form.endDate.isValid()
            ? form.endDate.toISOString()
            : "",
        remarks: form.remarks,
      }));

      try {
        await fetchData("/ClubInfo", "PUT", clubData);
        showAlert("동아리/대외활동 정보가 성공적으로 저장되었습니다.");
        setState(true);
      } catch (error) {
        console.error("Error saving club info:", error);
        showAlert("동아리/대외활동 정보 저장에 실패했습니다.", "error");
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
        clubName: "",
        role: "",
        startDate: null,
        endDate: null,
        remarks: "",
      },
    ]);
  };

  const deleteForm = async (id) => {
    setForms(forms.filter((form) => form.id !== id));
    await fetchData(`/ClubInfo/${id}`, "DELETE");
  };

  return (
    <>
      <InfoTitle
        title={"동아리/대외활동"}
        state={state}
        setState={changeState}
      />
      {forms.map((form) => (
        <ClubForm
          key={form.id}
          formData={form}
          onUpdate={(field, value) => updateForm(form.id, field, value)}
          onDelete={() => deleteForm(form.id)}
          isFirst={forms.length === 1}
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
