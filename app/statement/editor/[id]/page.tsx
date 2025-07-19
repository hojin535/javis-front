// app/statement/[id]/page.tsx (Server Component)
import {EditorPage} from "@/components/Editor/EditorPage.tsx";

type Props = {
  params: {
    id: string;
  };
};

export default function StatementEditorPage({params}: Props) {
  return <EditorPage id={params.id}/>;
}
