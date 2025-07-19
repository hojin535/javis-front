import React, {useRef, useState} from "react";
import {Box, Card, Chip, IconButton, Menu, MenuItem, styled, Tooltip, Typography,} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useRouter} from "next/navigation";
import {KoreanDateTime} from "@/utils/KoreanDateTime.ts";
import {TransformDeadline} from "@/utils/TransformDeadline.ts";
import {mapMenuToQuery} from "@/utils/mapMenuToQuery.ts";
import {useFetchData} from "@/hooks/useFetchData.tsx";

const CustomCard = styled(Card)`
    min-height: 80px;
    padding: 20px;
    cursor: pointer;
    border-radius: 20px;

    &:hover {
        outline: 2px solid black;
    }
`;
export const CardItem = ({
                           title,
                           text,
                           date,
                           tags,
                           id,
                           handleUpdate,
                           side,
                           search,
                           type,
                           recruitId,
                           setOpenSearch
                         }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const iconButtonRef = useRef(null);
  const router = useRouter();
  const {fetchData} = useFetchData();

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(iconButtonRef.current);
  };

  const cardDelete = async (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    try {
      await fetchData(`/Card/${id}`, 'DELETE');
      handleUpdate();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  // 검색 카드용
  const handleClickCard = (id) => {
    if (search === "search" || side) {
      router.push(`/statement?menu=${mapMenuToQuery(type)}`);
      setOpenSearch();
    } else if (search === "searchRecruit") {
      router.push(`/recruits-page/${recruitId}?menu=${mapMenuToQuery(type)}`);
      setOpenSearch();
    }

    router.push(`/statement/editor/${id}`);
  };

  const TooltipText = () => (
    <Box>
      <Typography variant="body2">시간: {KoreanDateTime(date)}</Typography>
      <Typography variant="body2" sx={{wordBreak: "break-word"}}>
        {title}
      </Typography>
      <Typography variant="body2">
        태그: {tags.map((tagObj) => tagObj.tag).join(", ")}
      </Typography>
    </Box>
  );

  const truncatedTitle =
    title.length > 20 ? title.substring(0, 20) + "..." : title;

  //태그 전부 제거하기
  const htmlString = text;
  const tempDiv = document.createElement("div"); // 임시 div 생성
  tempDiv.innerHTML = htmlString; // HTML 문자열 삽입
  const textOnly = tempDiv.textContent || tempDiv.innerText; // 태그를 제거한 텍스트만 추출

  const truncatedText =
    textOnly.length > 200 ? text.substring(0, 50) + "..." : textOnly;

  const handleTopClick = (e) => {
    e.stopPropagation();
    {
      search === "search"
        ? router.push("/statement")
        : router.push(`/recruits-page/${recruitId}`);
    }
  };
  console.log(date);
  return (
    <>
      <CustomCard
        onClick={() => {
          handleClickCard(id);
          handleUpdate();
        }}
        sx={{
          minHeight: "80px",
          padding: "20px",
          cursor: "pointer",
          borderRadius: "17px",
          position: "relative",
        }}
      >
        {/* 상단에 검정색 배경과 텍스트 배치 */}
        {search && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30px", // 텍스트가 잘 보이도록 높이 설정
              backgroundColor: "black",
              borderTopLeftRadius: "17px",
              borderTopRightRadius: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "5px 0",
            }}
            onClick={handleTopClick}
          >
            {search === "search"
              ? "내 자소서 / 경험정리"
              : `마감 ${TransformDeadline(date)}`}
          </Box>
        )}

        {/* Dots Menu 아이콘 추가 */}
        <IconButton
          ref={iconButtonRef}
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display:
              (search === "search" || search === "searchRecruit") && "none",
          }}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={cardDelete}>🗑️삭제</MenuItem>
        </Menu>

        <Tooltip title={<TooltipText/>}>
          <Box
            sx={{
              fontSize: "12px",
              color: "gray",
              marginTop:
                search === "search" || search === "searchRecruit"
                  ? "35px"
                  : "none",
            }}
          >
            {KoreanDateTime(date)}
          </Box>
          <Box
            sx={{
              marginTop: "10px",
              fontWeight: "700",
              fontSize: "18px",
              flexWrap: "nowrap",
              display: "flex",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {truncatedTitle}
          </Box>
          <Box
            sx={{
              marginTop: "10px",
              fontWeight: "400",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {truncatedText}
          </Box>
          {/* 태그 한 줄로 */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflow: "hidden",
              whiteSpace: "nowrap",
              marginTop: "10px",
            }}
          >
            {tags.map((tagObj, index) => (
              <Chip
                key={index}
                label={tagObj.tag}
                sx={{
                  backgroundColor:
                    tagObj.type === "competency" ? "#e3f2ff" : "#f6e2ff",
                  color: tagObj.type === "competency" ? "#57788c" : "#b659b9",
                  marginRight: "5px",
                  marginBottom: "10px",
                }}
              />
            ))}
          </Box>
        </Tooltip>
      </CustomCard>
    </>
  );
};
