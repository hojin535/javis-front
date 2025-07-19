import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * ModalComponent는 일반적인 모달을 생성하는 컴포넌트입니다.
 *
 * @param {string} title - 모달의 제목입니다.
 * @param {React.ReactNode} body - 모달의 본문 내용입니다. (HTML 또는 JSX)
 * @param {boolean} show - 모달의 표시 여부를 결정하는 상태입니다. true일 경우 모달이 표시됩니다.
 * @param {() => void} [handleClose] - 모달을 닫는 함수입니다. (없을 경우 버튼을 표시하지 않음)
 * @param {() => void} [onConfirm] - 확인 버튼 클릭 시 호출되는 함수입니다. (없을 경우 버튼을 표시하지 않음)
 * @param {string} [cancelText="취소"] - 취소 버튼의 텍스트입니다. (기본값: "취소")
 * @param {string} [confirmText="확인"] - 확인 버튼의 텍스트입니다. (기본값: "확인")
 * @param {string} [cancelVariant="secondary"] - 취소 버튼의 색상 변형입니다. (기본값: "secondary")
 * @param {string} [confirmVariant="primary"] - 확인 버튼의 색상 변형입니다. (기본값: "primary")
 * @param {boolean|string} [backdrop="static"] - 외부 클릭 시 모달을 닫을지 여부입니다. (기본값: "static")
 * @param {boolean} [centered=false] - 모달을 화면 정중앙에 배치할지 여부를 결정하는 상태입니다. (기본값: false)
 * @param {()=>void} [headerCloseBtn] - 모달을 닫는 상단 버튼입니다.
 * @param {string} [maxWidth] xs,sm,md,lg,xl
 */
const ModalComponent = ({
  title,
  body,
  show,
  handleClose,
  onConfirm,
  cancelText = "취소",
  confirmText = "확인",
  cancelVariant = "secondary",
  confirmVariant = "primary",
  backdrop = "",
  centered = false,
  headerCloseBtn,
  maxWidth = "sm",
}) => (
  <Dialog
    open={show}
    onClose={handleClose}
    disableEscapeKeyDown={backdrop === "static"} // "static"일 경우 키보드로 모달을 닫지 않음
    fullWidth={false} // 전체 너비 사용 안함
    // maxWidth="xs" // 모달 너비를 작게 설정
    PaperProps={{
      sx: {
        position: "relative",
        margin: centered ? "auto" : "initial",
        maxWidth: "xl",
        minWidth: "300px", // 모달 너비 설정
      },
    }}
  >
    {title && (
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {headerCloseBtn && (
          <IconButton
            aria-label="close"
            onClick={headerCloseBtn}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
    )}

    <DialogContent
      dividers
      sx={{
        display: "flex",
        justifyContent: "center", // 콘텐츠 중앙 정렬
        alignItems: "center", // 수직 중앙 정렬
      }}
    >
      {body}
      {headerCloseBtn && !title && (
        <IconButton
          aria-label="close"
          onClick={headerCloseBtn}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogContent>

    {(handleClose || onConfirm) && (
      <DialogActions>
        {handleClose && (
          <Button
            variant="contained"
            color={cancelVariant}
            onClick={handleClose}
          >
            {cancelText}
          </Button>
        )}
        {onConfirm && (
          <Button
            variant="contained"
            color={confirmVariant}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    )}
  </Dialog>
);

export default ModalComponent;
