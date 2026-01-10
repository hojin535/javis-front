import { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { InfoTitle } from "./InfoTitle.jsx";
import { DatePickerInput } from "../common/InputComponent.jsx";
import { Add, Delete, ContentPaste, Save } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styled from "styled-components";
import { useAlert } from "./InfoPage";
import { useFetchData } from "../../hooks/useFetchData.jsx";
import { TemplateSelectModal, TemplateSaveModal } from "./TemplateModal.jsx";
import { FIELD_TYPES } from "../../constants/fieldTemplates.js";

const CustomButton = styled(Button)`
  background-color: black;
  color: white;
  margin-top: 10px;

  &:hover {
    background: gray;
    color: black;
  }
`;

const TemplateButton = styled(Button)`
  margin-right: 8px;
  margin-top: 10px;
`;

const CustomFieldForm = ({ formData, onUpdate, onDelete, isFirst, state }) => {
    const renderFieldInput = () => {
        switch (formData.fieldType) {
            case "textarea":
                return (
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="값을 입력하세요"
                        value={formData.fieldValue || ""}
                        onChange={(e) => onUpdate("fieldValue", e.target.value)}
                        disabled={state}
                    />
                );
            case "date":
                // Ensure the value is a valid dayjs object or null
                const dateValue = formData.fieldValue
                    ? (dayjs.isDayjs(formData.fieldValue) ? formData.fieldValue : dayjs(formData.fieldValue))
                    : null;
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerInput
                            value={dateValue}
                            onChange={(date) => onUpdate("fieldValue", date)}
                            disabled={state}
                        />
                    </LocalizationProvider>
                );
            case "dateRange":
                // Handle dateRange value as object with startDate and endDate
                const rangeValue = formData.fieldValue || { startDate: null, endDate: null };
                const startDate = rangeValue.startDate
                    ? (dayjs.isDayjs(rangeValue.startDate) ? rangeValue.startDate : dayjs(rangeValue.startDate))
                    : null;
                const endDate = rangeValue.endDate
                    ? (dayjs.isDayjs(rangeValue.endDate) ? rangeValue.endDate : dayjs(rangeValue.endDate))
                    : null;
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DatePickerInput
                                value={startDate}
                                onChange={(date) => onUpdate("fieldValue", { ...rangeValue, startDate: date })}
                                label="시작일"
                                disabled={state}
                            />
                            <Typography sx={{ mx: 1 }}>~</Typography>
                            <DatePickerInput
                                value={endDate}
                                onChange={(date) => onUpdate("fieldValue", { ...rangeValue, endDate: date })}
                                label="종료일"
                                disabled={state}
                            />
                        </Box>
                    </LocalizationProvider>
                );
            case "text":
            default:
                return (
                    <TextField
                        fullWidth
                        placeholder="값을 입력하세요"
                        value={formData.fieldValue || ""}
                        onChange={(e) => onUpdate("fieldValue", e.target.value)}
                        disabled={state}
                    />
                );
        }
    };

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ position: "relative", mt: isFirst ? 0 : 2, mb: 2 }}
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
                    <Delete />
                </IconButton>
            )}

            {/* 필드 타입 선택 */}
            <Grid item xs={12} sm={2}>
                <Typography>필드 타입</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth disabled={state}>
                    <InputLabel>타입 선택</InputLabel>
                    <Select
                        value={formData.fieldType || "text"}
                        label="타입 선택"
                        onChange={(e) => onUpdate("fieldType", e.target.value)}
                    >
                        {FIELD_TYPES.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={1} />

            {/* 필드 이름 입력 */}
            <Grid item xs={12} sm={2}>
                <Typography>필드 이름</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    placeholder="예: 자격증, 어학점수"
                    value={formData.fieldName || ""}
                    onChange={(e) => onUpdate("fieldName", e.target.value)}
                    disabled={state}
                />
            </Grid>

            {/* 필드 값 입력 */}
            <Grid item xs={12} sm={2}>
                <Typography>값</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
                {renderFieldInput()}
            </Grid>
        </Grid>
    );
};

export const CustomFieldsInfo = ({ customFieldsInfo = [] }) => {
    const [state, setState] = useState(true);
    const { fetchData } = useFetchData();
    const { showAlert } = useAlert();
    const [forms, setForms] = useState([
        {
            id: 0,
            fieldType: "text",
            fieldName: "",
            fieldValue: "",
        },
    ]);

    // 템플릿 모달 상태
    const [templateSelectOpen, setTemplateSelectOpen] = useState(false);
    const [templateSaveOpen, setTemplateSaveOpen] = useState(false);

    const updateForm = (id, field, value) => {
        setForms(
            forms.map((form) => (form.id === id ? { ...form, [field]: value } : form))
        );
    };

    useEffect(() => {
        if (customFieldsInfo && customFieldsInfo.length > 0) {
            const updatedInfo = customFieldsInfo.map((item, index) => {
                let fieldValue = item.fieldValue || "";

                if (item.fieldType === "date" && item.fieldValue) {
                    fieldValue = dayjs(item.fieldValue);
                } else if (item.fieldType === "dateRange" && item.fieldValue) {
                    // Parse dateRange value
                    const rangeData = typeof item.fieldValue === 'string'
                        ? JSON.parse(item.fieldValue)
                        : item.fieldValue;
                    fieldValue = {
                        startDate: rangeData.startDate ? dayjs(rangeData.startDate) : null,
                        endDate: rangeData.endDate ? dayjs(rangeData.endDate) : null,
                    };
                }

                return {
                    ...item,
                    id: index,
                    fieldValue,
                };
            });
            setForms(updatedInfo);
        }
    }, [customFieldsInfo]);

    const changeState = async () => {
        if (state) {
            setState(false);
        } else {
            const customData = forms.map((form) => {
                let fieldValue = form.fieldValue || "";

                if (form.fieldType === "date" && form.fieldValue?.isValid) {
                    fieldValue = form.fieldValue.isValid() ? form.fieldValue.toISOString() : "";
                } else if (form.fieldType === "dateRange" && form.fieldValue) {
                    // Serialize dateRange to JSON with ISO strings
                    const startDate = form.fieldValue.startDate?.isValid?.()
                        ? form.fieldValue.startDate.toISOString()
                        : null;
                    const endDate = form.fieldValue.endDate?.isValid?.()
                        ? form.fieldValue.endDate.toISOString()
                        : null;
                    fieldValue = JSON.stringify({ startDate, endDate });
                }

                return {
                    fieldType: form.fieldType || "text",
                    fieldName: form.fieldName || "",
                    fieldValue,
                };
            });

            try {
                await fetchData("/CustomInfo", "PUT", customData);
                showAlert("사용자 정의 필드가 성공적으로 저장되었습니다.");
                setState(true);
            } catch (error) {
                console.error("Error saving custom fields info:", error);
                showAlert("사용자 정의 필드 저장에 실패했습니다.", "error");
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
                fieldType: "text",
                fieldName: "",
                fieldValue: "",
            },
        ]);
    };

    const deleteForm = async (id) => {
        setForms(forms.filter((form) => form.id !== id));
    };

    // 템플릿 선택 시 필드 추가
    const handleSelectTemplate = (template) => {
        const existingFieldNames = forms.map(f => f.fieldName.toLowerCase().trim());
        const newFields = [];
        let skippedCount = 0;

        template.fields.forEach(field => {
            const fieldNameLower = field.fieldName.toLowerCase().trim();
            if (existingFieldNames.includes(fieldNameLower)) {
                skippedCount++;
            } else {
                const newId = forms.length + newFields.length > 0
                    ? Math.max(...forms.map(f => f.id), ...newFields.map(f => f.id)) + 1
                    : newFields.length;
                newFields.push({
                    id: newId,
                    fieldType: field.fieldType || "text",
                    fieldName: field.fieldName,
                    fieldValue: "",
                });
                existingFieldNames.push(fieldNameLower);
            }
        });

        if (newFields.length > 0) {
            // 빈 필드가 있는 경우 제거하고 새 필드 추가
            const nonEmptyForms = forms.filter(f => f.fieldName.trim() !== "");
            if (nonEmptyForms.length === 0) {
                setForms(newFields);
            } else {
                setForms([...nonEmptyForms, ...newFields]);
            }
        }

        if (skippedCount > 0 && newFields.length > 0) {
            showAlert(`${newFields.length}개 필드 추가, ${skippedCount}개 중복 건너뜀`);
        } else if (skippedCount > 0) {
            showAlert("모든 필드가 이미 존재합니다.", "warning");
        } else if (newFields.length > 0) {
            showAlert(`${newFields.length}개 필드가 추가되었습니다.`);
        }
    };

    return (
        <>
            <InfoTitle
                title={"사용자 정의 필드"}
                state={state}
                setState={changeState}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                자격증, 어학점수, 기타 경력 등 원하는 정보를 자유롭게 추가하세요.
            </Typography>

            {/* 템플릿 버튼 영역 */}
            {!state && (
                <Box sx={{ mb: 2 }}>
                    <TemplateButton
                        variant="outlined"
                        startIcon={<ContentPaste />}
                        onClick={() => setTemplateSelectOpen(true)}
                    >
                        템플릿에서 추가
                    </TemplateButton>
                    <TemplateButton
                        variant="outlined"
                        startIcon={<Save />}
                        onClick={() => setTemplateSaveOpen(true)}
                    >
                        템플릿으로 저장
                    </TemplateButton>
                </Box>
            )}

            {forms.map((form) => (
                <CustomFieldForm
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
                    <Add sx={{ color: "green", fontWeight: "bold" }} />
                    새 필드 추가하기
                </CustomButton>
            )}

            {/* 템플릿 선택 모달 */}
            <TemplateSelectModal
                open={templateSelectOpen}
                onClose={() => setTemplateSelectOpen(false)}
                onSelectTemplate={handleSelectTemplate}
                showAlert={showAlert}
            />

            {/* 템플릿 저장 모달 */}
            <TemplateSaveModal
                open={templateSaveOpen}
                onClose={() => setTemplateSaveOpen(false)}
                fields={forms}
                showAlert={showAlert}
            />
        </>
    );
};
