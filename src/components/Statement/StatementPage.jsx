import { BaseComponent } from "../common/BaseComponent.jsx";
import { PageTitle } from "../common/PageTitle.jsx";
import { PageContent } from "../common/PageContent.jsx";
import { StatementFilterMenu } from "./StatementFilterMenu.jsx";
import { CardList } from "./CardList.jsx";
import StatementAddCardBody from "./StatementAddModalComponent/StatementAddCardBody.jsx";
import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData.jsx";

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
    const response = await fetchData(`/Card/All?mode=${mode}&type=${selectMenu}`);
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
      <PageTitle title={"내 자소서"} />
      <PageContent>
        <StatementFilterMenu
          menus={menus}
          selectMenu={selectMenu}
          setSelectMenu={setSelectMenu}
          modalBody={<StatementAddCardBody mode={mode} />}
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
