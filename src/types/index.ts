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

  interface IChartSensorData {
    status: number[];
    times: number[];
    values: number[] | string[];
  }

  interface IChartSensorDataResponse {
    code: number;
    data: IChartSensorData;
  }

  interface IHistoryDataHeader {
    name: string;
    unit: string;
  }

  interface IHistoryDataPoint {
    status: number;
    value: string;
  }

  interface IHistoryRow {
    data: IHistoryDataPoint[];
    id: number;
    sent: boolean;
    time: string;
  }

  interface IHistoryData {
    code: number;
    data: {
      headers: IHistoryDataHeader[];
      rows: IHistoryRow[];
    };
  }

  interface Alarm {
    earlyHighThreshold: string;
    earlyLowThreshold: string;
    highThreshold: string;
    lowThreshold: string;
  }

  interface Calibration {
    formula: string;
    offset: string;
    positive: boolean;
    slope: string;
  }

  interface CustomizeTotal {
    autoSlope: boolean;
    sensorId: number;
    totalId: number;
    totalMode: number;
  }

  interface HttpWtw {
    sid: number;
    vid: number;
  }

  interface ModbusStandard {
    dataType: number;
    deviceAddress: number;
    endian: number;
    registerType: number;
    startAddress: number;
  }

  interface SerialSigas {
    index: number;
  }

  interface SerialSystea {
    index: number;
    line: number;
  }

  interface SerialTeom {
    channelNumber: string;
    prc: number;
    stationNumber: number;
  }

  interface SerialYoung {
    index: number;
  }

  interface SqlDcs {
    column: string;
    dataType: number;
    required: boolean;
    table: string;
  }

  interface SqlStandard {
    column: string;
    columnIndex: number;
    dataType: number;
    database: string;
    table: string;
  }

  interface ViewCommon {
    index: number;
    visible: boolean;
  }

  interface ViewGrid {
    columnSpan: number;
    rowSpan: number;
  }

  interface Configuration {
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

  interface SensorStatus {
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

  interface SensorData {
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
    sensorStatus: SensorStatus;
    status: number;
    syncing: boolean;
    unit: string;
    variable: string;
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
