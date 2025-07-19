import {Box, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import {Remove} from "@mui/icons-material";
import {Comment} from "./Comment.tsx";
import {CustomButton} from "@/components/common/Button/CustomButton.tsx";
import {useEffect, useState} from "react";
import {useFetchData} from "@/hooks/useFetchData.tsx";
import {useParams} from "next/navigation";

export const CommentList = ({setIsDrawerOpen}) => {
  const [update, setUpdate] = useState();
  const {fetchData} = useFetchData();
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const {id} = useParams();
  const handleUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(`/Comment?cardId=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [update, id]);
  const handleAddComment = async () => {
    try {
      await fetchData(`/Comment`, "POST", {
        text: value,
        cardId: id,
      });

      setValue("");
      handleUpdate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        width: "300px",
        position: "absolute",
        top: "-50px",
        right: "-40px",
        height: "calc(100vh - 96px)",
        backgroundColor: "white",
        borderLeft: "1px solid #e0e0e0",
        boxShadow: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{display: "flex", alignItems: "center"}}>
        <Typography variant="h6" gutterBottom>
          코멘트 남기기
        </Typography>
        <Tooltip title={"닫기"}>
          <IconButton
            sx={{marginLeft: "auto"}}
            onClick={() => setIsDrawerOpen(false)}
          >
            <Remove/>
          </IconButton>
        </Tooltip>
      </Box>

      {/* 댓글 리스트 영역에 스크롤 추가 */}
      <Box
        sx={{
          background: "#f8f5fa",
          flexGrow: 1,
          p: 1,
          overflowY: "auto",
          maxHeight: "calc(100vh - 300px)",

          /* 스크롤바 스타일 */
          "&::-webkit-scrollbar": {
            width: "8px", // 스크롤바 너비
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c0c0c0", // 스크롤바 색상
            borderRadius: "4px", // 둥근 모서리
            "&:hover": {
              backgroundColor: "#a0a0a0", // 호버 시 색상
            },
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e0e0e0", // 스크롤바 트랙 색상
            borderRadius: "4px",
          },
        }}
      >
        {comments.map((comment) => {
          return (
            <Box sx={{marginBottom: "10px"}} key={comment.id}>
              <Comment
                text={comment.text}
                date={comment.date}
                id={comment.id}
                handleUpdate={handleUpdate}
              />
            </Box>
          );
        })}
      </Box>

      <Box sx={{marginTop: "10px"}}>
        <TextField
          placeholder="댓글을 입력하세요"
          multiline
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 줄바꿈 방지
              await handleAddComment(); // 비동기 함수 실행
            }
          }}
          rows={4}
          variant="outlined"
          fullWidth
          sx={{mb: 2}}
        />
        <CustomButton variant="contained" fullWidth onClick={handleAddComment}>
          댓글 저장
        </CustomButton>
      </Box>
    </Box>
  );
};
