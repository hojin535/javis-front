"use client";

import {EditorPage} from "@/components/Editor/EditorPage.tsx";

export default function RecruitEditorPage({params}) {
  const {id, item} = params;
  return <EditorPage id={id} item={item}/>;
}
