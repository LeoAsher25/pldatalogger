import {
  Dashboard,
  Equalizer,
  PublishedWithChanges,
  Scale,
  TableChart,
} from "@mui/icons-material";
import ERoutePath from "src/types/routes.enum";

export const mainNavigation = [
  {
    name: "Số liệu thực tế",
    icon: Dashboard,
    url: ERoutePath.REALTIME,
  },
  {
    name: "Số liệu",
    icon: Scale,
    url: ERoutePath.DATA,
  },
  {
    name: "Đồ thị",
    icon: Equalizer,
    url: ERoutePath.CHART,
  },
  {
    name: "Bảng số liệu",
    icon: TableChart,
    url: ERoutePath.TABLE,
  },
  {
    name: "Lấy mẫu",
    icon: PublishedWithChanges,
    url: ERoutePath.SAMPLE,
  },
];
