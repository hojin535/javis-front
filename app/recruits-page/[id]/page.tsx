import {RecruitItemPage} from "@/components/common/Recruits/RecruitItemPage/RecruitItemPage.tsx";

export default function RecruitItemNextPage({params}) {
  const {id} = params;
  return <RecruitItemPage id={id}/>;
}
