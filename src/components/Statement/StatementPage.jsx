import { BaseComponent } from "../common/BaseComponent.jsx";
import { PageTitle } from "../common/PageTitle.jsx";
import { PageContent } from "../common/PageContent.jsx";
import { StatementFilterMenu } from "./StatementFilterMenu.jsx";
import { CardList } from "./CardList.jsx";
import StatementAddCardBody from "./StatementAddModalComponent/StatementAddCardBody.jsx";
import { useEffect, useState } from "react";
import { client } from "../../api.js";

export const MyStatementPage = () => {
  const [cardList, setCardList] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectMenu, setSelectMenu] = useState("경험정리");
  const [update, setUpdate] = useState(true);
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const mode = "statement";

  const fetchCard = async () => {
    const response = await client.get(
      `/Card/All?mode=${mode}&type=${selectMenu}`,
    );
    setCardList(response.data);
    console.log("card data", response.data);
  };
  const fetchCount = async () => {
    const response = await client.get(`/Card/count?mode=${mode}`);
    setMenus(response.data);
    console.log("갯수", response.data);
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
