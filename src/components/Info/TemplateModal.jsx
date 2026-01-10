import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {
    Close,
    Delete,
    Translate,
    WorkspacePremium,
    Code,
    Flight,
    Bookmark,
} from "@mui/icons-material";
import { DEFAULT_FIELD_TEMPLATES } from "../../constants/fieldTemplates";
import { useFetchData } from "../../hooks/useFetchData";

// 아이콘 매핑
const ICON_MAP = {
    Translate: Translate,
    WorkspacePremium: WorkspacePremium,
    Code: Code,
    Flight: Flight,
    Bookmark: Bookmark,
};

/**
 * 템플릿 선택 모달 컴포넌트
 */
export const TemplateSelectModal = ({ open, onClose, onSelectTemplate, showAlert }) => {
    const [tabValue, setTabValue] = useState(0);
    const [userTemplates, setUserTemplates] = useState([]);
    const { fetchData } = useFetchData();

    // 사용자 템플릿 조회
    const loadUserTemplates = async () => {
        try {
            const response = await fetchData("/CustomTemplate");
            if (response.data && response.data.L) {
                const templates = response.data.L.map(item => ({
                    templateId: item.M.templateId.S,
                    name: item.M.name.S,
                    fields: item.M.fields.L.map(f => ({
                        fieldType: f.M.fieldType.S,
                        fieldName: f.M.fieldName.S,
                    })),
                }));
                setUserTemplates(templates);
            }
        } catch (error) {
            console.error("Error loading user templates:", error);
        }
    };

    useEffect(() => {
        if (open) {
            loadUserTemplates();
        }
    }, [open]);

    const handleDeleteTemplate = async (templateId) => {
        try {
            await fetchData(`/CustomTemplate/${templateId}`, "DELETE");
            showAlert("템플릿이 삭제되었습니다.");
            loadUserTemplates();
        } catch (error) {
            console.error("Error deleting template:", error);
            showAlert("템플릿 삭제에 실패했습니다.", "error");
        }
    };

    const renderTemplateCard = (template, isUserTemplate = false) => {
        const IconComponent = ICON_MAP[template.icon] || Bookmark;

        return (
            <Grid item xs={12} sm={6} key={template.id || template.templateId}>
                <Card
                    sx={{
                        height: "100%",
                        position: "relative",
                        "&:hover": { boxShadow: 4 }
                    }}
                >
                    {isUserTemplate && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTemplate(template.templateId);
                            }}
                            sx={{
                                position: "absolute",
                                right: 4,
                                top: 4,
                                zIndex: 1,
                            }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    )}
                    <CardActionArea
                        onClick={() => {
                            onSelectTemplate(template);
                            onClose();
                        }}
                        sx={{ height: "100%", p: 1 }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <IconComponent sx={{ mr: 1, color: "primary.main" }} />
                                <Typography variant="h6" component="div">
                                    {template.name}
                                </Typography>
                            </Box>
                            {template.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {template.description}
                                </Typography>
                            )}
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {template.fields.slice(0, 3).map((field, idx) => (
                                    <Chip
                                        key={idx}
                                        label={field.fieldName}
                                        size="small"
                                        variant="outlined"
                                    />
                                ))}
                                {template.fields.length > 3 && (
                                    <Chip
                                        label={`+${template.fields.length - 3}`}
                                        size="small"
                                        color="primary"
                                    />
                                )}
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                템플릿에서 추가
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Tabs
                    value={tabValue}
                    onChange={(e, v) => setTabValue(v)}
                    sx={{ mb: 2 }}
                >
                    <Tab label="기본 템플릿" />
                    <Tab label={`내 템플릿 (${userTemplates.length})`} />
                </Tabs>

                {tabValue === 0 && (
                    <Grid container spacing={2}>
                        {DEFAULT_FIELD_TEMPLATES.map(template =>
                            renderTemplateCard(template)
                        )}
                    </Grid>
                )}

                {tabValue === 1 && (
                    <Grid container spacing={2}>
                        {userTemplates.length > 0 ? (
                            userTemplates.map(template =>
                                renderTemplateCard(template, true)
                            )
                        ) : (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ py: 4 }}
                                >
                                    저장된 템플릿이 없습니다.<br />
                                    현재 필드를 템플릿으로 저장해보세요.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
};

/**
 * 템플릿 저장 모달 컴포넌트
 */
export const TemplateSaveModal = ({ open, onClose, fields, showAlert }) => {
    const [templateName, setTemplateName] = useState("");
    const { fetchData } = useFetchData();

    const handleSave = async () => {
        if (!templateName.trim()) {
            showAlert("템플릿 이름을 입력해주세요.", "warning");
            return;
        }

        const fieldsToSave = fields
            .filter(f => f.fieldName && f.fieldName.trim())
            .map(f => ({
                fieldType: f.fieldType,
                fieldName: f.fieldName,
            }));

        if (fieldsToSave.length === 0) {
            showAlert("저장할 필드가 없습니다.", "warning");
            return;
        }

        try {
            await fetchData("/CustomTemplate", "POST", {
                name: templateName.trim(),
                fields: fieldsToSave,
            });
            showAlert("템플릿이 저장되었습니다.");
            setTemplateName("");
            onClose();
        } catch (error) {
            console.error("Error saving template:", error);
            showAlert("템플릿 저장에 실패했습니다.", "error");
        }
    };

    const validFields = fields.filter(f => f.fieldName && f.fieldName.trim());

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>현재 필드를 템플릿으로 저장</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    label="템플릿 이름"
                    placeholder="예: 나만의 어학 템플릿"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    저장될 필드 ({validFields.length}개):
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {validFields.map((field, idx) => (
                        <Chip
                            key={idx}
                            label={field.fieldName}
                            size="small"
                            variant="outlined"
                        />
                    ))}
                    {validFields.length === 0 && (
                        <Typography variant="body2" color="error">
                            필드 이름이 입력된 필드가 없습니다.
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={validFields.length === 0}
                >
                    저장
                </Button>
            </DialogActions>
        </Dialog>
    );
};
