import {Accordion, AccordionSummary, Box, Card, CardContent, Divider, styled, Typography,} from "@mui/material";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";
import {IntroductionItem} from "./IntroductionItem.jsx";
import {useNavigate} from "react-router-dom";

const IntroductionList = ({item, index, handleUpdate, recruitId}) => {
  const [expanded, setExpanded] = useState(false);
  const navi = useNavigate();

  const handleTitleClick = (e) => {
    e.stopPropagation();
    navi(`/recruits-page`);
    navi(`/recruits-page/${item.id}`);
    handleUpdate();
  };

  const handleAccordionClick = (event) => {
    // 아이콘 클릭 시 Accordion 토글 방지
    if (event.target.closest('.navigate-icon')) {
      event.stopPropagation();
      return;
    }
    setExpanded(!expanded);
  };

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const CustomCardContent = styled(CardContent)`
      padding: 0 !important; /* 전체 패딩 제거 */

      &.MuiCardContent-root {
          padding-bottom: 0 !important; /* paddingBottom 제거 */
      }
  `;

  return (
    <>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "none",
          marginBottom: "20px",
          // backgroundColor: "#4d4d4d",
        }}
      >
        <CustomCardContent className="side">
          <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{flexDirection: "row-reverse"}}
              onClick={handleAccordionClick}
            >
              <Typography variant="body1" sx={{mr: 1}}>
                📁
              </Typography>
              <Typography variant="body1">{item.title}</Typography>
              <FlipToFrontIcon
                className="navigate-icon"
                sx={{ml: "auto", cursor: "pointer", fontSize: "20px"}}
                onClick={handleTitleClick}
              />
            </AccordionSummary>
            <Divider/>
            <IntroductionItem
              card={item.cards}
              handleUpdate={handleUpdate}
              recruitId={recruitId}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                mb: 2,
              }}
            ></Box>
          </Accordion>
        </CustomCardContent>
      </Card>
    </>
  );
};

export default IntroductionList;
