import {Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {PeriodSelector} from "./PeriodSelector.jsx";
import {SupportStatusSelector} from "./SupportStatusSelector.jsx";
import {AutoResizeInput} from "./AutoResizeInput.jsx";
import {UrlTooltipItem} from "./UrlTooltipItem.jsx";
import LinkIcon from "@mui/icons-material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {useRecoilValue} from "recoil";
import {updateAtom} from "../../../Recoil.jsx";
import {useFetchData} from "../../../hooks/useFetchData.jsx";
import {RecruitDeadLineCalandar} from "./RecruitDeadLineCalandar.jsx";

export const RecruitItemFilterMenu = () => {
  const {id} = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [recruit, setRecruit] = useState([]);
  const [urlOpen, setUrlOpen] = useState(false);
  const tooltipRef = useRef(null);
  // 1. 초기값을 "" 에서 null 로 변경
  const [deadline, setDeadline] = useState(null);
  const navi = useNavigate();
  const update = useRecoilValue(updateAtom);
  const {fetchData} = useFetchData();

  useEffect(() => {
    const getRecruitData = async () => {
      try {
        const response = await fetchData(`/Recruit/${id}`);
        if (response && response.data) {
          setRecruit(response.data);
          setTitle(response.data.title);
          setUrl(response.data.url);
          // 2. API 응답 값이 있을 때만 dayjs 객체로 변환하도록 하여 안정성 강화
          setDeadline(response.data.deadline ? dayjs(response.data.deadline) : null);
        }
      } catch (error) {
        console.error("Failed to fetch recruit data:", error);
      }
    };
    getRecruitData();
    // 3. useEffect 의존성 배열에 id와 fetchData 추가
  }, [id, update, fetchData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 메뉴를 열 때 기준점 설정
  };

  const handleClose = () => {
    setAnchorEl(null); // 메뉴를 닫음
  };

  const deleteRecruit = async () => {
    try {
      await fetchData(`/Recruit/${id}`, "DELETE");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    await deleteRecruit();
    navi("/recruits-page");
    handleClose(); // 메뉴 닫기
  };

  const updateTitle = async (value) => {
    try {
      await fetchData(`/Recruit/title/${id}`, "PUT", {title: value});
    } catch (error) {
      console.error(error);
    }
  };
  const updateUrl = async (url) => {
    try {
      await fetchData(`/Recruit/url/${id}`, "PUT", {url});
    } catch (error) {
      console.error(error);
    }
  };
  const updateDeadline = async (value) => {
    try {
      // value가 dayjs 객체일 수 있으므로, 서버가 원하는 포맷으로 변환 후 전송
      const formattedDate = value ? value.format() : null;
      await fetchData(`/Recruit/deadline/${id}`, "PUT", {deadline: formattedDate});
    } catch (error) {
      console.error(error);
    }
  };

  // 툴팁 바깥 클릭해야 닫히도록
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setUrlOpen(false); // 외부 클릭 시 툴팁 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* 연도 및 분기 */}
      <Box
        sx={{
          borderBottom: "1px solid #eaebec",
          height: "50px",
          display: "flex", // flexbox 레이아웃 설정
          alignItems: "center", // 수직 중앙 정렬
          justifyContent: "space-between", // 양쪽 끝으로 배치
        }}
      >
        <Box sx={{display: "flex", alignItems: "center"}}>
          <PeriodSelector yearHalf={recruit.yearHalf}/>
          {/* 지원 상태 */}
          <SupportStatusSelector status={recruit.state}/>
          {/* 제목 */}
          <Box
            sx={{
              display: "flex", // flexbox로 제목과 아이콘을 한 줄에 배치
              alignItems: "center", // 제목과 아이콘을 수직 중앙 정렬
              fontSize: "20px",
              fontWeight: "700",
              marginLeft: "50px",
              position: "relative", // 상대 위치 설정 (자식 요소 제어)
            }}
          >
            <AutoResizeInput
              value={title}
              onChange={setTitle}
              onBlur={(e) => updateTitle(e.target.value)}
            />
            {/* url */}
            <Tooltip
              placement="top"
              open={urlOpen}
              title={
                <div ref={tooltipRef}>
                  <UrlTooltipItem
                    value={url}
                    onChange={setUrl}
                    updateUrl={updateUrl}
                  />
                </div>
              }
              arrow
            >
              <LinkIcon
                sx={{marginLeft: "8px", cursor: "pointer"}}
                onMouseEnter={() => setUrlOpen(true)} // 마우스 호버로 열기
                onMouseLeave={() => {
                }} // 마우스가 버튼을 떠나도 닫히지 않게
                onClick={() => {
                  const trimmedUrl = url.trim(); // 앞뒤 공백 제거

                  if (
                    !trimmedUrl.startsWith("http://") &&
                    !trimmedUrl.startsWith("https://")
                  ) {
                    alert(
                      "공고 URL은 http:// 또는 https://로 시작해야 합니다.",
                    );
                    return; // URL이 유효하지 않으면 새 창을 열지 않음
                  }

                  window.open(
                    trimmedUrl,
                    "_blank",
                    "noopener,noreferrer,width=1200,height=800,scrollbars=yes,resizable=yes",
                  ); // 새 창으로 열기
                }}
              />
            </Tooltip>
          </Box>
        </Box>

        {/* RecruitDeadLineCalandar와 IconButton을 함께 배치 */}
        <Box sx={{display: "flex", alignItems: "center"}}>
          <RecruitDeadLineCalandar
            updateDeadline={updateDeadline}
            selectedDate={deadline}
            setSelectedDate={setDeadline}
          />
          <IconButton onClick={handleClick}>
            <MoreVertIcon/>
          </IconButton>
        </Box>

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
          <MenuItem onClick={handleDelete}>🗑️ 삭제</MenuItem>
        </Menu>
      </Box>
    </>
  );
};