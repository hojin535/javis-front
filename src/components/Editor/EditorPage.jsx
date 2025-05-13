import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import QuillEditor from "./QuillEditor.jsx";
import { useEffect, useRef, useState } from "react";
import { BaseComponent } from "../common/BaseComponent.jsx";
import ChatIcon from "@mui/icons-material/Chat";
import { CommentList } from "./CommentList.jsx";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { updateAtom } from "../../Recoil.jsx";
import { useFetchData } from "../../hooks/useFetchData.jsx";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const EditorPage = () => {
  const [save, setSave] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [update, setUpdate] = useRecoilState(updateAtom);
  const quilRef = useRef();
  const { fetchData } = useFetchData();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(`/Card?id=${id}`);
        setTitle(response.data.title);
        setText(response.data.text);
        console.log(response.data);
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, [update]);

  const putData = async () => {
    try {
      await  fetchData(`/card/${id}`, "PUT",{ title, text })
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  useEffect(() => {
    const delayDebounceTimer = setTimeout(async () => {
      await putData();
      setSave("저장완료");
    }, 1000);

    // Quill 인스턴스에서 텍스트 길이 가져오기
    if (quilRef.current) {
      const editorInstance = quilRef.current.getEditor();
      const length = editorInstance.getLength();
      setTextLength(length - 1);
    }

    return () => clearTimeout(delayDebounceTimer);
  }, [title, text]);

  console.log(id);
  // Drawer를 여닫는 함수
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <BaseComponent>
      <Box sx={{ display: "flex", position: "relative" }}>
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            transition: "margin-right 0.3s",
            marginRight: isDrawerOpen ? "300px" : "0",
          }}
        >
          <Card
            sx={{
              borderRadius: "20px",
              border: "1px solid #e0e0e0",
              overflow: "visible",
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle"
                  gutterBottom
                  sx={{ color: "gray" }}
                >
                  24년 9월 12일 08시 07분 | {save}
                </Typography>
              </Box>
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle"
                  gutterBottom
                  sx={{
                    marginRight: 2,
                    color: "gray",
                    verticalAlign: "middle",
                  }}
                >
                  {textLength}자/5000자(공백 포함)
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TextField
                placeholder={"제목을 입력해주세요"}
                variant="standard"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSave("저장중");
                }}
                sx={{
                  width: "100%",
                  height: "60px",
                  fontSize: "18px",
                  "& .MuiInputBase-input": {
                    padding: "10px",
                    fontSize: "18px",
                  },
                }}
              />
            </Box>

            <Box>
              <QuillEditor
                quilRef={quilRef}
                save={save}
                setSave={setSave}
                text={text}
                setText={setText}
                setTextLength={setTextLength}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button variant="contained" color="primary">
                저장
              </Button>
            </Box>
          </Card>
        </Box>

        {/* 오른쪽 아래에 고정된 채팅 아이콘 버튼 */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            width: "50px",
            height: "50px",
            position: "fixed",
            right: "20px",
            bottom: "20px",
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            boxShadow: 3,
          }}
        >
          <ChatIcon />
        </IconButton>

        {/* 댓글 입력 창 - 오른쪽에 고정 */}
        {isDrawerOpen && <CommentList setIsDrawerOpen={setIsDrawerOpen} />}
      </Box>
    </BaseComponent>
  );
};
