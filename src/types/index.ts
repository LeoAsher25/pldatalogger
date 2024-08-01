/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace SystemTypes {
  enum DataStatus {
    MEASURING,
  }

  interface ILoginFormData {
    email: string;
    password: string;
    remember?: boolean;
  }

  interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  interface ISensorData {
    status: DataStatus;
    alert: boolean;
    alertEarly: boolean;
    name: string;
    time: Date | number | string;
    unit: string;
    value: string;
  }

  interface IRealtimeData {
    alert: boolean;
    alertEarly: boolean;
    enabled: boolean;
    id: number;
    name: string;
    precision: number;
    status: number;
    time: number;
    unit: string;
    value: string;
  }

  interface ISampleData {
    address: string;
    autorun: boolean;
    connected: boolean;
    connectionId: number;
    currentDistributor: number;
    database: string;
    enabled: boolean;
    filled: number;
    method: number;
    model: number;
    name: string;
    nextDistributor: number;
    password: string;
    port: number;
    protocol: number;
    remoted: boolean;
    tag: string;
    temperatureInside: number;
    temperatureOutside: number;
    times: number;
    total: number;
    username: string;
  }
}

declare namespace UserTypes {
  interface IProfile {
    email: string;
    fullName: string;
    avatar?: string;
  }
}

declare namespace SystemUI {
  interface NavItem {
    name: string;
    url: string;
    icon?: React.ElementType;
    children?: NavItem[];
  }

  interface NavGroupProps {
    data: NavItem[];
    collapsed: boolean;
  }

  interface NavItemProps {
    item: NavItem;
    collapsed: boolean;
  }

  interface BreadcrumbItem {
    title: string;
    path: string;
  }
}
