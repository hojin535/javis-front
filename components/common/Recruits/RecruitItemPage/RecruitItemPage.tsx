"use client";
import {useCallback, useEffect, useState} from "react";
import {BaseComponent} from "@/components/common/BaseComponent.tsx";
import {PageContent} from "@/components/common/PageContent.tsx";
import {StatementFilterMenu} from "../../Statement/StatementFilterMenu.tsx";
import StatementAddCardBody from "@/components/common/Statement/StatementAddModalComponent/StatementAddCardBody.tsx";
import {useAtom} from "jotai";
import {updateAtom} from "@/app/Jotai.tsx";
import {RecruitItemFilterMenu} from "./RecruitItemFilterMenu.tsx";
import {useFetchData} from "@/hooks/useFetchData.tsx";
import {CardList} from "../../Statement/CardList.tsx";

import {useParams} from "next/navigation"

export function RecruitItemPage() {
  const [menus, setMenus] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [update, setUpdate] = useAtom(updateAtom);
  const [selectMenu, setSelectMenu] = useState("경험정리");
  const {fetchData} = useFetchData();
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const {id} = useParams();

  const fetchCount = useCallback(async () => {
    const response = await fetchData(`/Card/recruit/count/${id}?mode=recruit`);
    setMenus(response.data);
  }, [fetchData, id]);

  const fetchRecruitCard = useCallback(async () => {
    const response = await fetchData(
      `/Card/recruit/${id}?mode=recruit&type=${selectMenu}`,
    );
    setCardList(response.data);
  }, [fetchData, id, selectMenu]);

  useEffect(() => {
    fetchCount();
  }, [update, fetchCount]);

  useEffect(() => {
    fetchRecruitCard();
  }, [update, fetchRecruitCard]);
  //cardList 부분
  return (
    <BaseComponent>
      <RecruitItemFilterMenu/>
      <PageContent>
        <StatementFilterMenu
          modalBody={<StatementAddCardBody mode={"recruit"}/>}
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