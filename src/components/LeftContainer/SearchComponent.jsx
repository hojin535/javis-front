import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {useRef, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {CardList} from "../Statement/CardList.jsx";
import {useFetchData} from "../../hooks/useFetchData.jsx";

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

export const SearchComponent = ({setOpenSearch}) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const cardRef = useRef(null);
  const [statement, setStatement] = useState([]);
  const [recruit, setRecruit] = useState([]);
  const {fetchData} = useFetchData();
  const handleClear = () => {
    setSearchText("");
    setSelectedTags([]);
    setIsFocused(true); // Clear 후 포커스 가능하도록 설정
  };

  const searchData = async () => {
    try {
      const tags = encodeURIComponent(JSON.stringify(selectedTags));
      const response = await fetchData(`/Search/tag?tags=${tags}`);
      setStatement(response.data.statement || []);
      setRecruit(response.data.recruit || []);
    } catch (error) {
      console.error(error);
    }
  };

  const searchTextData = async () => {
    try {
      const response = await fetchData(`/Search?text=${searchText}`);
      setStatement(response.data.statement);
      setRecruit(response.data.recruit);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (selectedTags.length > 0) {
      await searchData();
    } else {
      await searchTextData();
    }
    setIsFocused(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChipClick = (tag, type) => {
    if (searchText) return;

    const isTagSelected = selectedTags.some(
      (selectedTag) => selectedTag.tag === tag,
    );

    // 전체 태그 최대 3개 제한
    if (!isTagSelected && selectedTags.length >= 3) {
      alert("태그는 최대 3개까지 선택할 수 있습니다.");
      return;
    }

    if (!isTagSelected) {
      setSelectedTags([...selectedTags, {tag, type}]);
    } else {
      handleRemove(tag);
    }
  };

  const handleRemove = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag.tag !== tag,
    );
    setSelectedTags(updatedTags);
  };


  return (
    <Box
      sx={{
        width: "1200px",
        minHeight: "400px",
        maxHeight: "800px",
        position: "relative",
        padding: "0 10px",
        marginTop: "10px",
      }}
      onClick={() => setIsFocused(false)}
    >
      {/* 검색 제목과 아이콘 */}
      <Box
        sx={{
          display: "flex",
          fontSize: "20px",
          fontWeight: "700",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1000,
          paddingTop: "10px",
        }}
      >
        검색
      </Box>

      {/* TextField와 선택된 태그 표시 */}
      <Box
        sx={{
          marginTop: "10px",
          position: "sticky",
          top: "40px",
          zIndex: 999,
          background: "white",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          onClick={(e) => e.stopPropagation()}
          placeholder={
            selectedTags.length > 0
              ? " 태그 삭제 후 내용 검색이 가능합니다."
              : "태그 선택 및 검색어 입력"
          }
          value={searchText}
          onChange={(e) => {
            if (selectedTags.length === 0) {
              setSearchText(e.target.value);
            }
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
                {selectedTags.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.tag}
                    onDelete={() => handleRemove(item.tag)}
                    color={
                      item.type === "personality" ? "secondary" : "primary"
                    }
                    sx={{
                      marginRight: "4px",
                    }}
                  />
                ))}
              </>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchText || selectedTags.length ? (
                  <IconButton
                    onClick={handleClear}
                    sx={{
                      padding: "0px",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  >
                    <ClearIcon/>
                  </IconButton>
                ) : null}
                <Button
                  onClick={handleSearch}
                  disabled={!searchText && selectedTags.length === 0}
                  sx={{
                    color: searchText || selectedTags.length ? "white" : "gray",
                    backgroundColor:
                      searchText || selectedTags.length ? "black" : "#eaebec",
                  }}
                >
                  검색
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {/* 태그 칩들이 들어갈 자리 */}
        {isFocused && !searchText && (
          <Card
            ref={cardRef}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "absolute",
              top: "100px",
              width: "calc(100% - 40px)",
              maxHeight: "250px",
              overflowY: "auto",
              padding: "10px",
              boxShadow: 3,
              zIndex: 10,
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "#333", // 스크롤바 배경색
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1c1c1c", // 스크롤바 트랙 색상
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#555",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#777",
              },
            }}
          >
            <Box sx={{paddingBottom: "10px"}}>
              <Box sx={{fontWeight: "400", marginBottom: "10px"}}>
                태그 검색
              </Box>
              <Typography
                color="textSecondary"
                style={{fontSize: "14px", marginBottom: "10px"}}
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
                        selectedTags.some(
                          (selectedTag) => selectedTag.tag === tag,
                        )
                          ? "primary"
                          : "default"
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              <Typography
                color="textSecondary"
                style={{
                  fontSize: "14px",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
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
                        selectedTags.some(
                          (selectedTag) => selectedTag.tag === tag,
                        )
                          ? "secondary"
                          : "default"
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        )}
      </Box>

      {/* item 검색 결과가 나타나는 자리 */}
      <Box
        sx={{
          padding: "0 5px",
          paddingBottom: "10px",
          overflowY: "auto",
          // maxHeight: "calc(100% - 60px)",
          paddingTop: "20px",
          height: "100%",
          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#555",
            borderRadius: "8px",
          },
        }}
      >
        <Box sx={{marginTop: "20px"}}>
          {statement.length === 0 && recruit.length === 0 ? (
            <>검색 내용이 없습니다.</>
          ) : (
            <>
              {statement.length > 0 && (
                <>
                  <div>내 자소서</div>
                  <CardList cardList={statement} search={"search"}/>
                </>
              )}
              {statement.length > 0 && recruit.length > 0 && (
                <Divider sx={{marginTop: "30px"}}/>
              )}
              {recruit.length > 0 && (
                <Box sx={{marginTop: "20px"}}>
                  <div>내 공고</div>
                  <CardList cardList={recruit} search={"searchRecruit"} setOpenSearch={setOpenSearch}/>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
