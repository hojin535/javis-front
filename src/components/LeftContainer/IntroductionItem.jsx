import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mapMenuToQuery } from "../util/mapMenuToQuery.js";

export const IntroductionItem = ({ card, handleUpdate, recruitId }) => {
  const navi = useNavigate();

  const handleMove = (id, type) => {
    navi(`/recruits-page/${recruitId}?menu=${mapMenuToQuery(type)}`);
    navi(`/statement/editor/${id}`);
    handleUpdate();
  };
  return (
    <>
      {card.map((item, itemIndex) => (
        <Box
          key={itemIndex}
          sx={{
            padding: "10px",
            borderRadius: "8px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            mt: 1,
            cursor: "pointer",
            transition: "background-color 0.3s",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f7f6fa",
              color: "#6255f7",
            },
            "&:hover .more-vert-icon": {
              // 마우스를 올렸을 때 아이콘 표시
              visibility: "visible",
              opacity: 1,
            },
          }}
          onClick={() => handleMove(item.id, item.type)}
        >
          <Box sx={{ display: "inline-block", mr: "5px" }}>📜</Box>
          <Box sx={{ display: "inline-block" }}>{item.title || "No Title"}</Box>
        </Box>
      ))}
    </>
  );
};
