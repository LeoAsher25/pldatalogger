export namespace SystemTypes {
  export enum DataStatus {
    MEASURING,
  }

  export enum ESensorStatus {
    MEASURING,
    CALIBRATING,
    ERROR,
    AUTO,
    MAX,
  }

  export enum Alerttatus {
    "Bình thường",
    "Lo ngại",
    "Xấu",
  }

  export interface IResponse {
    code?: string;
    message: string;
  }

  export interface ILoginFormData {
    username: string;
    password: string;
    remember?: boolean;
  }

  export interface ILoginResponse extends IResponse {
    data: {
      accessToken: string;
      refreshToken: string;
    };
    user: UserTypes.IProfile;
  }

  export interface ISensorData {
    status: DataStatus;
    alert: boolean;
    alertEarly: boolean;
    name: string;
    time: Date | number | string;
    unit: string;
    value: string;
  }

  export interface IRealtimeData {
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

  export interface ISampleData {
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

  export interface IChartSensorData {
    status: number[];
    times: number[];
    values: number[] | string[];
  }

  export interface IChartSensorDataResponse {
    code: number;
    data: IChartSensorData;
  }

  export interface IHistoryDataHeader {
    name: string;
    unit: string;
  }

  export interface IHistoryDataPoint {
    status: number;
    value: string;
  }

  export interface IHistoryRow {
    data: IHistoryDataPoint[];
    id: number;
    sent: boolean;
    time: string;
  }

  export interface IHistoryData {
    code: number;
    data: {
      headers: IHistoryDataHeader[];
      rows: IHistoryRow[];
    };
  }

  export interface Alarm {
    earlyHighThreshold: string;
    earlyLowThreshold: string;
    highThreshold: string;
    lowThreshold: string;
  }

  export interface Calibration {
    formula: string;
    offset: string;
    positive: boolean;
    slope: string;
  }

  export interface CustomizeTotal {
    autoSlope: boolean;
    sensorId: number;
    totalId: number;
    totalMode: number;
  }

  export interface HttpWtw {
    sid: number;
    vid: number;
  }

  export interface ModbusStandard {
    dataType: number;
    deviceAddress: number;
    endian: number;
    registerType: number;
    startAddress: number;
  }

  export interface SerialSigas {
    index: number;
  }

  export interface SerialSystea {
    index: number;
    line: number;
  }

  export interface SerialTeom {
    channelNumber: string;
    prc: number;
    stationNumber: number;
  }

  export interface SerialYoung {
    index: number;
  }

  export interface SqlDcs {
    column: string;
    dataType: number;
    required: boolean;
    table: string;
  }

  export interface SqlStandard {
    column: string;
    columnIndex: number;
    dataType: number;
    database: string;
    table: string;
  }

  export interface ViewCommon {
    index: number;
    visible: boolean;
  }

  export interface ViewGrid {
    columnSpan: number;
    rowSpan: number;
  }

  export interface Configuration {
    customize: {
      total: CustomizeTotal;
    };
    http: {
      wtw: HttpWtw;
    };
    modbus: {
      standard: ModbusStandard;
    };
    serial: {
      sigas: SerialSigas;
      systea: SerialSystea;
      teom: SerialTeom;
      young: SerialYoung;
    };
    sql: {
      dcs: SqlDcs;
      standard: SqlStandard;
    };
    view: {
      common: ViewCommon;
      grid: ViewGrid;
    };
  }

  export interface ISensorStatus {
    configuration: {
      customize: {
        dependency: {
          formula: string;
        };
      };
      modbus: {
        standard: ModbusStandard;
      };
      validation: {
        calibrating: string;
        erroring: string;
        measuring: string;
        precision: number;
      };
    };
    configurations: string;
    connectionId: number;
    enabled: boolean;
    model: number;
    protocol: number;
    sensorId: number;
  }

  export interface SensorData {
    alarm: Alarm;
    calibration: Calibration;
    configuration: Configuration;
    configurations: string;
    connectionId: number;
    enableAlarm: boolean;
    enableCalibration: boolean;
    enabled: boolean;
    id: number;
    model: number;
    name: string;
    precision: number;
    protocol: number;
    sensorStatus: ISensorStatus;
    status: number;
    syncing: boolean;
    unit: string;
    variable: string;
  }
}

export namespace UserTypes {
  export interface IProfile {
    active: boolean;
    name: string;
    roles: number;
    username: string;
    avatar?: string;
  }
}

export namespace SystemUI {
  export interface NavItem {
    name: string;
    url: string;
    icon?: React.ElementType;
    children?: NavItem[];
  }

  export interface NavGroupProps {
    data: NavItem[];
    collapsed: boolean;
  }

  export interface NavItemProps {
    item: NavItem;
    collapsed: boolean;
  }

  export interface BreadcrumbItem {
    title: string;
    path: string;
  }
}
