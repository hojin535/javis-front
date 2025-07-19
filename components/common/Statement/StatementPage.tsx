"use client";
import {BaseComponent} from "@/components/common/BaseComponent.tsx";
import {PageTitle} from "@/components/common/PageTitle.tsx";
import {PageContent} from "@/components/common/PageContent.tsx";
import {StatementFilterMenu} from "./StatementFilterMenu.tsx";
import {CardList} from "./CardList.tsx";
import StatementAddCardBody from "@/components/common/Statement/StatementAddModalComponent/StatementAddCardBody.tsx";
import {useEffect, useState} from "react";
import {useFetchData} from "@/hooks/useFetchData.tsx";

export const MyStatementPage = () => {
  const [cardList, setCardList] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectMenu, setSelectMenu] = useState("경험정리");
  const [update, setUpdate] = useState(true);
  const {fetchData} = useFetchData();
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const mode = "statement";

  const fetchCard = async () => {
    const response = await fetchData(
      `/Card/All?mode=${mode}&type=${selectMenu}`
    );
    setCardList(response.data);
  };
  const fetchCount = async () => {
    const response = await fetchData(`/Card/count?mode=${mode}`);
    setMenus(response.data);
  };
  useEffect(() => {
    fetchCount();
    fetchCard();
  }, [update, selectMenu]);

  return (
    <BaseComponent>
      <PageTitle title={"내 자소서"}/>
      <PageContent>
        <StatementFilterMenu
          menus={menus}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
          modalBody={<StatementAddCardBody mode={mode}/>}
        />
        <CardList
          cardList={cardList}
          setCardList={setCardList}
          mode={mode}
          selectMenu={selectMenu}
          update={update}
          handleUpdate={handleUpdate}
        />
      </PageContent>
    </BaseComponent>
  );
};
