import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import ModalComponent from "@/components/common/ModalComponent.tsx";

export const AddCardComponent = ({
                                   modalBody,
                                   handleOpen,
                                   handleClose,
                                   show,
                                 }) => {
  return (
    <>
      <Button
        size="small"
        sx={{
          marginLeft: "auto",
          fontSize: "14px",
          color: "white",
          marginTop: "5px",
          marginBottom: "5px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "darkgray", // 호버 시 색상 변경
          },
        }}
        onClick={handleOpen}
      >
        <Add/> 카드추가
      </Button>

      <ModalComponent
        headerCloseBtn={handleClose}
        show={show}
        backdroup={"true"}
        body={modalBody}
      />
    </>
  );
};
