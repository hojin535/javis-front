"use client";
import React, {ChangeEvent, FC, RefObject, useEffect, useState} from "react";
import {Box} from "@mui/material";
import type ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import "./quillCustom.css";
import {QuillEditor} from "@/components/Editor/QuillEditor";

interface QuillEditorProps {
  save: string;
  setSave: (status: string) => void;
  text: string;
  setText: (text: string) => void;
  forwardedRef: RefObject<ReactQuill>;
}


const QuilEditor: FC<QuillEditorProps> = ({
                                            save,
                                            setSave,
                                            text,
                                            setText,
                                            forwardedRef,
                                          }) => {
  const [fontSize, setFontSize] = useState("16px"); // Default font size

  // Handles changes to the font size dropdown.
  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setFontSize(newSize); // Update state with the new font size.

    // Directly apply the font size to the editor's DOM element if the ref is available.
    if (forwardedRef.current) {
      const editorInstance = forwardedRef.current.getEditor();
      const editorRoot = editorInstance.root;
      editorRoot.style.fontSize = newSize;
    }
  };

  // Effect to focus the editor once it's mounted.
  useEffect(() => {
    // Using a timeout to ensure the editor is fully initialized before focusing.
    const timer = setTimeout(() => {
      if (forwardedRef.current) {
        forwardedRef.current.getEditor().focus();
      }
    }, 100);

    // Cleanup the timer when the component unmounts.
    return () => clearTimeout(timer);
  }, [forwardedRef]); // Dependency on forwardedRef to ensure it's available.

  // Effect to apply font size changes.
  useEffect(() => {
    // Check if the ref is available before accessing the editor instance.
    if (forwardedRef.current) {
      const editorInstance = forwardedRef.current.getEditor();
      const editorRoot = editorInstance.root;
      editorRoot.style.fontSize = fontSize;
    }
  }, [fontSize, forwardedRef]); // Re-run when fontSize or the ref changes.

  // Handles content changes in the editor.
  const handleChange = (value: string) => {
    if (save !== "저장중") {
      setSave("저장중");
    }
    setText(value);
  };

  return (
    <Box>
      {/* Font size selection dropdown */}
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

      <QuillEditor
        ref={forwardedRef}
        value={text}
        onChange={handleChange}
        modules={QuilEditor.modules}
        formats={QuilEditor.formats}
        theme={"bubble"}
        placeholder="내용을 입력해주세요"
      />
    </Box>
  );
};

// Modules and formats for the Quill editor toolbar.
// Defined as static properties on the component function to prevent recreation on re-renders.
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
