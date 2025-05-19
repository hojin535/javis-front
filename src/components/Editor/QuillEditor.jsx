import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import {Box} from "@mui/material";

import "./quillCustom.css";

const QuilEditor = ({
                      save,
                      setSave,
                      text,
                      setText,
                      quilRef,
                    }) => {
  const [fontSize, setFontSize] = useState("16px"); // 기본 폰트 크기 설정
  
  // 글자 크기 변경 핸들러
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value); // 선택된 글자 크기로 상태 업데이트

    if (quilRef.current) {
      const editorInstance = quilRef.current.getEditor();
      const editorRoot = editorInstance.root;
      editorRoot.style.fontSize = e.target.value; // Quill의 전체 글자 크기 변경
    }
  };

  useEffect(() => {
    // Quill 인스턴스가 완전히 로드된 후 포커스 적용
    setTimeout(() => {
      if (quilRef.current) {
        const editorInstance = quilRef.current.getEditor();
        editorInstance.focus(); // 에디터에 포커스
      }
    }, 100); // 약간의 지연을 줘서 Quill이 완전히 로드된 후 포커스 적용
  }, []);

  useEffect(() => {
    const editorInstance = quilRef.current.getEditor();
    const editorRoot = editorInstance.root;
    editorRoot.style.fontSize = fontSize;
  }, [fontSize]);

  const handleChange = (value) => {
    if (save !== "저장중") {
      setSave("저장중");
    }
    setText(value);
  };

  return (
    <Box>
      {/* 글자 크기 선택 드롭다운 */}
      <label htmlFor="fontSizeSelect">글자 크기: </label>
      <select
        id="fontSizeSelect"
        value={fontSize}
        onChange={handleFontSizeChange}
      >
        <option value="12px">작게</option>
        <option value="16px">보통</option>
        <option value="20px">크게</option>
        <option value="25px">아주 크게</option>
      </select>

      <ReactQuill
        ref={quilRef}
        value={text}
        onChange={handleChange}
        modules={QuilEditor.modules}
        formats={QuilEditor.formats}
        theme={"bubble"}
        placeholder="내용을 입력해주세요" // placeholder 추가
      />
    </Box>
  );
};

QuilEditor.modules = {
  toolbar: [
    [{list: "ordered"}, {list: "bullet"}],
    ["bold", "italic", "underline"],
    [{align: []}],
  ],
};

QuilEditor.formats = [
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
  "align",
];

export default QuilEditor;
