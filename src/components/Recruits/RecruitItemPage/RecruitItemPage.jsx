import React, { useEffect, useState } from "react";
import { BaseComponent } from "../../common/BaseComponent.jsx";
import { PageContent } from "../../common/PageContent.jsx";
import { StatementFilterMenu } from "../../Statement/StatementFilterMenu.jsx";
import { CardList } from "../../Statement/CardList.jsx";
import StatementAddCardBody from "../../Statement/StatementAddModalComponent/StatementAddCardBody.jsx";
import { useRecoilState } from "recoil";
import { updateAtom } from "../../../Recoil.jsx";
import { RecruitItemFilterMenu } from "./RecruitItemFilterMenu.jsx";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData.jsx";

export function RecruitItemPage() {
  const [menus, setMenus] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [update, setUpdate] = useRecoilState(updateAtom);
  const [selectMenu, setSelectMenu] = useState("경험정리");
  const {fetchData} = useFetchData();
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const { id } = useParams();
  const mode = "recruit";
  const fetchCount = async () => {
    const response = await fetchData(`/Card/recruit/count/${id}?mode=${mode}`);
    setMenus(response.data);
    console.log("갯수", response.data);
  };
  const fetchRecruitCard = async () => {
    const response = await fetchData(
      `/Card/recruit/${id}?mode=${mode}&type=${selectMenu}`,
    );
    setCardList(response.data);
    console.log("값", response.data);
  };
  useEffect(() => {
    fetchCount();
    fetchRecruitCard();
  }, [update, selectMenu]);
  //cardList 부분

  return (
    <BaseComponent>
      <RecruitItemFilterMenu />

      <PageContent>
        <StatementFilterMenu
          modalBody={<StatementAddCardBody mode={mode} />}
          menus={menus}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
        />
        <CardList
          handleUpdate={handleUpdate}
          cardList={cardList}
          setCardList={setCardList}
        />
      </PageContent>
    </BaseComponent>
  );
}
