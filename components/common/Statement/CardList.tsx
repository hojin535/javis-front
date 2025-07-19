import {Box, Typography} from "@mui/material";
import {CardItem} from "@/components/common/Card/CardItem.tsx";

const tags = [
  {tag: "최적화", type: "competency"},
  {tag: "DB", type: "competency"},
  {tag: "웹 접근성 준수", type: "competency"},
  {tag: "API", type: "competency"},
  {tag: "코드 품질", type: "competency"},
  {tag: "설계", type: "competency"},
  {tag: "배포", type: "competency"},
  {tag: "생산성", type: "competency"},
  {tag: "보안", type: "competency"},
  {tag: "테스트", type: "competency"},
  {tag: "디자인시스템", type: "competency"},
  {tag: "UI/UX", type: "competency"},
  {tag: "도메인", type: "competency"},
  {tag: "이해도", type: "competency"},
  {tag: "자동화", type: "competency"},
  {tag: "기타", type: "competency"},
  {tag: "라이브러리", type: "competency"},
  {tag: "리더십", type: "personal"},
  {tag: "성장", type: "personal"},
  {tag: "일정", type: "personal"},
  {tag: "멘탈 관리", type: "personal"},
  {tag: "실패 경험", type: "personal"},
  {tag: "도전", type: "personal"},
  {tag: "갈등경험", type: "personal"},
  {tag: "문제해결", type: "personal"},
  {tag: "분석력", type: "personal"},
  {tag: "성공 경험", type: "personal"},
  {tag: "책임감", type: "personal"},
  {tag: "커리어 계획", type: "personal"},
  {tag: "창의성", type: "personal"},
  {tag: "소통", type: "personal"},
  {tag: "협업 능력", type: "personal"},
];

export const CardList = ({side, handleUpdate, cardList = [], search, setOpenSearch}) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: side
          ? "repeat(1)"
          : "repeat(4, minmax(230px, 1fr))",
        gap: "10px",
        width: "100%",
      }}
    >
      {cardList.length > 0 ? (
        cardList.map((item) => (
          <CardItem
            search={search}
            handleUpdate={handleUpdate}
            mode={item.mode}
            title={item.title}
            text={item.text || ""}
            date={item.date}
            tags={item.tags}
            key={item.id}
            id={item.id}
            side={side}
            type={item.type}
            recruitId={item.recruit_id}
            setOpenSearch={setOpenSearch}
          />
        ))
      ) : (
        <Typography
          sx={{
            gridColumn: "1 / -1",
            textAlign: "center",
            paddingY: 10,
            color: "text.secondary",
          }}
        >
          아직 등록된 내용이 없습니다.
        </Typography>
      )}
    </Box>
  );
};