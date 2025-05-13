import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTag } from "../../common/CustomTag.jsx";

// 모든 태그 예시 (역량 태그와 인성 태그 포함)
const allTags = [
  "최적화",
  "DB",
  "API",
  "코드 품질",
  "설계",
  "배포",
  "생산성",
  "보안",
  "자동화",
  "라이브러리",
  "웹 접근성 준수",
  "테스트",
  "디자인시스템",
  "UI/UX",
  "도메인 이해도",
  "기타",
  "리더쉽",
  "성장",
  "열정",
  "도전",
  "갈등 경험",
  "문제 해결",
  "분석력",
  "창의성",
  "소통",
  "협업 능력",
  "멘탈 관리",
  "실패 경험",
  "성공 경험",
  "책임감",
  "커리어 계획",
];

const CustomAccordion = styled(Accordion)`
  .MuiAccordionSummary-content {
    margin-top: 7px;
  }
`;

export const TagSelector = ({ handleTagChange, selectedTags }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false); // 아코디언 상태

  const handleChipClick = (tag, type) => {
    // 이미 선택된 태그가 있는지 확인하고, 없다면 추가
    const isTagSelected = selectedTags.some(
      (selectedTag) => selectedTag.tag === tag,
    );

    if (!isTagSelected) {
      handleTagChange(null, [...selectedTags, { tag, type }]);
    } else {
      handleRemove(tag);
    }
  };

  const handleAccordionChange = (event, isExpanded) => {
    setIsEditMode(isExpanded);
    setExpanded(isExpanded);
  };

  // 포커스를 잃었을 때 아코디언을 닫는 핸들러
  const handleBlur = (e) => {
    // 관련된 포커스 여부를 확인하고 아코디언을 닫음
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setExpanded(false);
    }
  };

  const handleTagRemoveByIndex = (indexToRemove) => {
    const updatedTags = selectedTags.filter(
      (_, index) => index !== indexToRemove,
    );
    handleTagChange(null, updatedTags);
  };

  const handleRemove = (item) => {
    const removeTags = selectedTags.filter(
      (selectedTag) => selectedTag.tag !== item,
    );
    handleTagChange(null, removeTags);
  };

  // 선택된 칩 표시
  const ChipContent = (item, index) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover .close-icon": {
            visibility: "visible", // hover 시 보이도록 설정
          },
        }}
      >
        <span style={{ marginRight: "5px" }}>{item}</span>
        <CloseIcon
          className="close-icon"
          sx={{
            fontSize: "17px",
            display: isEditMode ? "inline-block" : "none", // 기본적으로 숨김 처리
            cursor: "pointer",
            "&:hover": {
              color: "red", // hover 시 색상 변화
            },
          }}
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
            handleTagRemoveByIndex(index); // 태그 제거 함수 호출
          }}
        />
      </Box>
    );
  };

  return (
    <CustomAccordion
      expanded={expanded}
      onChange={handleAccordionChange}
      sx={{ background: "#f9f9fa" }}
      onBlur={handleBlur} // 포커스를 잃을 때 핸들러 추가
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {selectedTags.length === 0 ? (
            <Typography color="textSecondary">태그를 선택해 주세요</Typography>
          ) : (
            selectedTags.map((item, index) => (
              <CustomTag
                key={index}
                item={item}
                label={ChipContent(item.tag, index)}
              />
            ))
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          color="textSecondary"
          style={{ fontSize: "14px", marginBottom: "10px" }}
        >
          역량 태그
        </Typography>
        <Grid container spacing={1}>
          {allTags.slice(0, 16).map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                clickable
                onClick={() => handleChipClick(tag, "competency")}
                color={
                  selectedTags.some((selectedTag) => selectedTag.tag === tag)
                    ? "primary"
                    : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          color="textSecondary"
          style={{ fontSize: "14px", marginBottom: "10px", marginTop: "20px" }}
        >
          인성 태그
        </Typography>
        <Grid container spacing={1}>
          {allTags.slice(16).map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                clickable
                onClick={() => handleChipClick(tag, "personality")}
                color={
                  selectedTags.some((selectedTag) => selectedTag.tag === tag)
                    ? "secondary"
                    : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </CustomAccordion>
  );
};
