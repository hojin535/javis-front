import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {TagSelector} from "./TagSelector.tsx";
import {TextTypeSelector} from "./TextTypeSelector.tsx";
import {useParams, useRouter} from "next/navigation";
import {useFetchData} from "@/hooks/useFetchData.tsx";

const StatementAddCardBody = ({mode}) => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  // selectedTags가 배열일 경우 JSON.stringify로 변환하여 전달
  const {fetchData} = useFetchData();
  const handleTypeChange = (event, newTags) => {
    setSelectedType(newTags);
  };
  const handleTagChange = (event, newTags) => {
    setSelectedTags(newTags);
  };

  const {id} = useParams();
  const handleAddCard = async () => {
    try {
      const response = await fetchData("/Card", "POST", {
        title: "제목없음",
        tags: selectedTags,
        mode,
        type: selectedType[0].tag,
        recruitId: mode === "recruit" && id,
      });

      router.push(`/statement/editor/${response.data.cardId}`);
    } catch (error) {
      alert(error);
    }
  };
  // console.log("selectedType", selectedType);
  return (
    <Box sx={{width: "450px"}}>
      <Typography
        color="textPrimary"
        component="div"
        sx={{fontWeight: "600", fontSize: "16px"}}
      >
        작성할 글에 대한 태그를 선택해 주세요.
      </Typography>
      <Typography
        color="textSecondary"
        component="div"
        sx={{fontSize: "12px"}}
      >
        태그 설정 후 쉽게 검색할 수 있습니다.
      </Typography>

      <Box sx={{marginTop: 2}}>
        <Box sx={{marginTop: "10px"}}>
          <TagSelector
            handleTagChange={handleTagChange}
            selectedTags={selectedTags}
          />
        </Box>
        <Box sx={{marginTop: "10px"}}>
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
        sx={{marginTop: "10px", width: "100%"}}
        onClick={handleAddCard}
      >
        선택 완료
      </Button>
    </Box>
  );
};

export default StatementAddCardBody;
