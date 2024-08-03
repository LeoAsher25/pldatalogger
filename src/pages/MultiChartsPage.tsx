import { DateRange } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { MouseEvent, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Page from "src/components/Page";
import HomeChart from "src/components/chart/HomeChart";
import sensorsList from "src/data/sensorsList";
import { useAppDispatch } from "src/hooks/customReduxHook";
import vi from "date-fns/esm/locale/vi";

// Types for date range selection
interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function MultiChartsPage() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [sensors] = useState(sensorsList.data);

  const RANGE_TODAY: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [selectRange, setSelectRange] = useState<Range>(RANGE_TODAY);
  const [range, setRange] = useState<Range>(RANGE_TODAY);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const checkRange = (days: number): boolean => {
    const start = new Date(selectRange.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(selectRange.endDate);
    end.setHours(23, 59, 59, 999);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > days) {
      enqueueSnackbar(
        `Vui lòng chọn khoảng thời gian trong vòng ${days} ngày`,
        {
          variant: "error",
        }
      );
      return false;
    }

    return true;
  };

  const handleOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {}, [dispatch]);

  return (
    <Page title="Đồ thị">
      <Container maxWidth={"xl"}>
        <Card
          sx={{
            mb: 2,
          }}>
          <Stack
            spacing={2}
            direction={{
              xs: "column",
              md: "row",
            }}
            sx={{
              py: 2.5,
              px: 3,
            }}>
            <TextField
              label="Thời gian"
              type="text"
              variant="outlined"
              sx={{
                minWidth: 250,
              }}
              value={`${moment(range.startDate).format(
                "DD/MM/YYYY"
              )} - ${moment(range.endDate).format("DD/MM/YYYY")}`}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleOpen}>
                      <DateRange />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              onClose={handleClose}>
              <Stack
                useFlexGap
                direction={"column"}
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={2}>
                <DateRangePicker
                  ranges={[selectRange]}
                  locale={vi}
                  inputRanges={[]}
                  onChange={(ranges: any) => setSelectRange(ranges.selection)}
                />
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    m: 1,
                  }}
                  onClick={() => {
                    handleClose();
                    if (checkRange(45)) {
                      setRange(selectRange);
                    } else {
                      setSelectRange(range);
                    }
                  }}>
                  Xác Nhận
                </Button>
              </Stack>
            </Popover>
          </Stack>
        </Card>
        <Grid container spacing={1.5}>
          {sensors.map((sensor: any) => (
            <Grid key={sensor.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <HomeChart
                sensor={sensor}
                from={range.startDate}
                to={range.endDate}
                height={230} // Assuming you want a fixed height for the charts
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
