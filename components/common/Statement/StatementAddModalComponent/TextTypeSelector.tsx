import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, styled, Typography,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useRef, useState} from "react";

// 태그 예시 (경험정리, 자기소개서, 면접 질문)
const allTags = ["경험정리", "자기소개서", "면접질문"];

const CustomAccordion = styled(Accordion)`
    .MuiAccordionSummary-content {
        margin-top: 7px;
    }
`;

export const TextTypeSelector = ({handleTagChange, selectedTags}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionRef = useRef(null); // Ref for the Accordion

  const handleChipClick = (tag) => {
    // 이미 선택된 태그가 있는지 확인하고, 선택 시 다른 태그를 모두 제거하고 선택한 태그만 유지
    if (selectedTags.length === 0 || selectedTags[0].tag !== tag) {
      handleTagChange(null, [{tag, type: "SingleSelection"}]); // 한 번에 하나의 태그만 유지
    }
  };

  const ChipContent = (item) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{marginRight: "5px"}}>{item}</span>
      </Box>
    );
  };

  const handleAccordionChange = (event, expanded) => {
    setIsExpanded(expanded); // 아코디언이 확장되면 true, 닫히면 false
  };

  // Handle onBlur to close Accordion when focus leaves the component
  const handleBlur = (e) => {
    // If the related target (element that will receive focus) is outside the accordion, close it
    if (!accordionRef.current.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };
  return (
    <CustomAccordion
      expanded={isExpanded}
      onChange={(_, expanded) => handleAccordionChange(_, expanded)}
      ref={accordionRef}
      sx={{background: "#f9f9fa"}}
      onBlur={handleBlur}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
          {selectedTags.length === 0 ? (
            <Typography color="textSecondary">
              글의 종류를 선택해 주세요
            </Typography>
          ) : (
            <Chip
              key={selectedTags[0].tag}
              label={ChipContent(selectedTags[0].tag)}
              sx={{
                alignItems: "center",
                marginRight: "5px",
                marginTop: "5px",
                backgroundColor: "#fff9c3",
                color: "#eb7532",
              }}
            />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {allTags.map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                clickable
                onClick={() => handleChipClick(tag)} // 중복을 방지하는 클릭 핸들러
                color={
                  selectedTags.some((selectedTag) => selectedTag.tag === tag)
                    ? "error"
                    : "default"
                } // selectedTags 안의 tag 값을 비교
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </CustomAccordion>
  );
};
