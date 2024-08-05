import { useSnackbar } from "notistack";

// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// components
import { useAppDispatch } from "src/hooks/customReduxHook";
import { deleteConnection } from "src/stores/configuration";

// ----------------------------------------------------------------------

export default function ConfirmDeleteConnectionForm({
  connection,
  open,
  onCancel,
}: any) {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    try {
      dispatch(deleteConnection(connection?.id));
      enqueueSnackbar("Đã xóa kết nối!");
      onCancel();
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle
        sx={{
          m: 1,
          p: 2,
        }}>
        XÓA KẾT NỐI
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Kết nối {connection.name}
          sẽ bị xóa và không thể khôi phục lại Bạn có muốn tiếp tục xóa không ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Hủy bỏ
        </Button>
        <Button onClick={onDelete} autoFocus color="error" variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
