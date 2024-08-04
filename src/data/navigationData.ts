import {
  Dashboard,
  DeviceHub,
  Equalizer,
  PublishedWithChanges,
  Scale,
  Settings,
  TableChart,
} from "@mui/icons-material";
import ERoutePath from "src/types/routes.enum";

export const mainNavigation: SystemUI.NavItem[] = [
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
  {
    name: "Cấu hình",
    icon: Settings,
    url: "",
    children: [
      {
        name: "Cảm biến",
        // icon: PublishedWithChanges,
        url: ERoutePath.CONFIGURATION_SENSORS,
      },
      {
        name: "Kết nối",
        // icon: PublishedWithChanges,
        url: ERoutePath.CONFIGURATION_CONNECTION,
      },
      {
        name: "Truyền số liệu",
        // icon: PublishedWithChanges,
        url: ERoutePath.CONFIGURATION_TRANSFER,
      },
      {
        name: "Máy lấy mẫu",
        // icon: PublishedWithChanges,
        url: ERoutePath.CONFIGURATION_SAMPLER,
      },
    ],
  },
  {
    name: "Thiếu bị",
    icon: DeviceHub,
    url: "",
    children: [
      {
        name: "Chung",
        // icon: PublishedWithChanges,
        url: ERoutePath.DEVICE_GENERAL,
      },
      {
        name: "Mạng kết nối",
        // icon: PublishedWithChanges,
        url: ERoutePath.DEVICE_NETWORK,
      },
      {
        name: "Thời gian",
        // icon: PublishedWithChanges,
        url: ERoutePath.DEVICE_TIME,
      },
      {
        name: "Cập nhật phần mềm",
        // icon: PublishedWithChanges,
        url: ERoutePath.DEVICE_OTA,
      },
    ],
  },
];
