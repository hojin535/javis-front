import {Box, Button, styled} from "@mui/material";
import {AddCardComponent} from "@/components/common/Card/AddCardComponent.tsx";
import {useState} from "react";
import {TypeMenu} from "./TypeMenu.tsx";

const CustomButton = styled(Button)`
    color: ${(props) => (props.isSelected ? "black" : "gray")};
    font-weight: bold;
    font-size: 18px;
    margin-right: 10px;

    &:hover {
        background: none;
    }
`;

export const StatementFilterMenu = ({
                                      menus = [],
                                      selectMenu,
                                      setSelectMenu,
                                      modalBody,
                                    }) => {
  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Box sx={{display: "flex"}}>
      <TypeMenu
        menus={menus}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
      <AddCardComponent
        modalBody={modalBody}
        show={show}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};
