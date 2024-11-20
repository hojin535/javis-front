import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { TagSelector } from "./TagSelector.jsx";
import { TextTypeSelector } from "./TextTypeSelector.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../../api.js";

const StatementAddCardBody = ({ mode }) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  // selectedTags가 배열일 경우 JSON.stringify로 변환하여 전달

  const handleTypeChange = (event, newTags) => {
    setSelectedType(newTags);
  };
  console.log(selectedTags);
  const handleTagChange = (event, newTags) => {
    setSelectedTags(newTags);
  };

  const { id } = useParams();
  // console.log(id, "공고id");
  console.log("mode", mode);
  const handleAddCard = async () => {
    console.log("selectedTags", selectedTags);
    console.log("type", selectedType[0].tag);
    try {
      const response = await client.post("/Card", {
        title: "제목없음",
        tags: selectedTags,
        mode,
        type: selectedType[0].tag,
        recruitId: mode === "recruit" && id,
      });

      navigate(`/statement/editor/${response.data.cardId}`);
    } catch (error) {
      alert(error);
    }
  };
  // console.log("selectedType", selectedType);
  return (
    <Box sx={{ width: "450px" }}>
      <Typography
        color="textPrimary"
        component="div"
        sx={{ fontWeight: "600", fontSize: "16px" }}
      >
        작성할 글에 대한 태그를 선택해 주세요.
      </Typography>
      <Typography
        color="textSecondary"
        component="div"
        sx={{ fontSize: "12px" }}
      >
        태그 설정 후 쉽게 검색할 수 있습니다.
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ marginTop: "10px" }}>
          <TagSelector
            handleTagChange={handleTagChange}
            selectedTags={selectedTags}
          />
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <Typography color="textSecondary">종류</Typography>
          <TextTypeSelector
            handleTagChange={handleTypeChange}
            selectedTags={selectedType}
          />
        </Box>
      </Box>
      <Button
        disabled={selectedType.length === 0}
        variant="contained"
        sx={{ marginTop: "10px", width: "100%" }}
        onClick={handleAddCard}
      >
        선택 완료
      </Button>
    </Box>
  );
};

export default StatementAddCardBody;
