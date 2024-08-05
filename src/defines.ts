export const ModelType = {
  CONNECTION: 0,
  SENSOR: 1,
  SAMPLER: 2,
  MODELTYPE: 3,
};

export const Protocols = {
  MODBUS_RTU: 0,
  MODBUS_TCP: 1,
  CURRENT: 2,
  SERIAL: 3,
  HTTP: 4,
  CUSTOMIZE: 5,
  SQL: 6,
  MAX: 7,
};

export const Models = {
  STANDARD: 0,
  TOTAL: 1,
  WTW: 2,
  SYSTEA: 3,
  MAXX_SP5: 4,
  ASIN: 5,
  DEPENDENCY: 6,
  YOUNG: 7,
  SIGAS: 8,
  WEKO: 9,
  DCS_SQL: 10,
  MAX: 11,
};

export const UserRoles = {
  VIEWER: 0,
  OPERATOR: 1,
  ADMINISTRATOR: 2,
  ROOT: 3,
  MAX: 4,
};

export const ModbusDataType = {
  UINT16: 0,
  INT16: 1,
  UINT32: 2,
  INT32: 3,
  FLOAT32: 4,
  FLOAT64: 5,
  MAX: 6,
};

export const SQLDataType = {
  INTEGER: 0,
  FLOAT: 1,
  DATETIME: 2,
  STRING: 3,
  MAX: 4,
};

export const Endianess = {
  LITTLE_ENDIAN: 0,
  BIG_ENDIAN: 1,
  LITTLE_ENDIAN_SWAP: 2,
  BIG_ENDIAN_SWAP: 3,
  MAX: 4,
};

export const SensorStatus = {
  MEASURING: 0,
  CALIBRATING: 1,
  ERROR: 2,
  AUTO: 3,
  MAX: 4,
};

export const ResetMode = {
  INDAY: 0,
  MANUAL: 1,
  MAX: 2,
};

export const HttpVersion = {
  v0_9: 0,
  v1_0: 1,
  v1_1: 2,
  v2_0: 3,
  v3_0: 4,
};
