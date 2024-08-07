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
import { useAppDispatch } from "src/hooks/customReduxHook";
import { deleteSensor } from "src/redux/configuration";

// ----------------------------------------------------------------------

export default function ConfirmDeleteSensor({ sensor, open, onCancel }: any) {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    try {
      dispatch(deleteSensor(sensor?.id));
      enqueueSnackbar("Đã xóa cảm biến!");
      onCancel();
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{ m: 1, p: 2 }}>XÓA CẢM BIẾN</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cảm biến {sensor?.name} sẽ bị xóa và không thể khôi phục lại Bạn có
          muốn tiếp tục xóa không?
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
