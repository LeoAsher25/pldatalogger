const sensorsList: {
  code: number;
  data: SystemTypes.SensorData[];
} = {
  code: 200,
  data: [
    {
      alarm: {
        earlyHighThreshold: "8.8",
        earlyLowThreshold: "6",
        highThreshold: "9",
        lowThreshold: "5.5",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 1,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 4,
            deviceAddress: 0,
            endian: 1,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 0,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 1, "vid": 0 } }, "modbus": { "standard": { "dataType": 4, "deviceAddress": 0, "endian": 1, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 0, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 10,
      enableAlarm: true,
      enableCalibration: false,
      enabled: true,
      id: 9,
      model: 2,
      name: "pH",
      precision: 2,
      protocol: 4,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 10,
        enabled: false,
        model: 2,
        protocol: 4,
        sensorId: 9,
      },
      status: 3,
      syncing: true,
      unit: "-",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "",
        earlyLowThreshold: "",
        highThreshold: "",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 1,
            vid: 1,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 1,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 1, "vid": 1 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 1, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 10,
      enableAlarm: false,
      enableCalibration: false,
      enabled: true,
      id: 8,
      model: 2,
      name: "Temp",
      precision: 2,
      protocol: 4,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 0,
        enabled: false,
        model: 0,
        protocol: 0,
        sensorId: 8,
      },
      status: 3,
      syncing: true,
      unit: "°C",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "70",
        earlyLowThreshold: "",
        highThreshold: "90",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 2,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 2,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 2, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 2, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 10,
      enableAlarm: true,
      enableCalibration: false,
      enabled: true,
      id: 7,
      model: 2,
      name: "TSS",
      precision: 2,
      protocol: 4,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 10,
        enabled: true,
        model: 2,
        protocol: 4,
        sensorId: 7,
      },
      status: 3,
      syncing: true,
      unit: "mg/L",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "100",
        earlyLowThreshold: "",
        highThreshold: "135",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 3,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 1,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 3,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 3, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 1, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 3, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 10,
      enableAlarm: true,
      enableCalibration: false,
      enabled: true,
      id: 10,
      model: 2,
      name: "COD",
      precision: 2,
      protocol: 4,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 1,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 2,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 1, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 2 } }',
        connectionId: 10,
        enabled: true,
        model: 2,
        protocol: 4,
        sensorId: 10,
      },
      status: 3,
      syncing: true,
      unit: "mg/L",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "8",
        earlyLowThreshold: "",
        highThreshold: "9",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 4,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 4,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 4, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 4, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 10,
      enableAlarm: true,
      enableCalibration: false,
      enabled: true,
      id: 6,
      model: 2,
      name: "NH4+",
      precision: 2,
      protocol: 4,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 10,
        enabled: true,
        model: 2,
        protocol: 4,
        sensorId: 6,
      },
      status: 3,
      syncing: true,
      unit: "mg/L",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "",
        earlyLowThreshold: "",
        highThreshold: "",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "-60.40",
        positive: true,
        slope: "0.0125",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 0,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 5,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 0, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 5, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 8,
      enableAlarm: false,
      enableCalibration: true,
      enabled: true,
      id: 3,
      model: 0,
      name: "Flow in 1",
      precision: 2,
      protocol: 2,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 0,
        enabled: false,
        model: 0,
        protocol: 0,
        sensorId: 3,
      },
      status: 3,
      syncing: true,
      unit: "m³/h",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "",
        earlyLowThreshold: "",
        highThreshold: "",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "-166",
        positive: true,
        slope: "0.041375",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 0,
            totalId: 0,
            totalMode: 0,
          },
        },
        http: {
          wtw: {
            sid: 0,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 6,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 0, "totalId": 0, "totalMode": 0 } }, "http": { "wtw": { "sid": 0, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 6, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 7,
      enableAlarm: false,
      enableCalibration: true,
      enabled: true,
      id: 2,
      model: 0,
      name: "Flow out 1",
      precision: 2,
      protocol: 2,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 0,
        enabled: false,
        model: 0,
        protocol: 0,
        sensorId: 2,
      },
      status: 3,
      syncing: true,
      unit: "m³/h",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "",
        earlyLowThreshold: "",
        highThreshold: "",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 3,
            totalId: 0,
            totalMode: 1,
          },
        },
        http: {
          wtw: {
            sid: 0,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 7,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 3, "totalId": 0, "totalMode": 1 } }, "http": { "wtw": { "sid": 0, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 7, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 0,
      enableAlarm: false,
      enableCalibration: false,
      enabled: true,
      id: 5,
      model: 1,
      name: "Total in",
      precision: 2,
      protocol: 5,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 0,
        enabled: false,
        model: 0,
        protocol: 0,
        sensorId: 5,
      },
      status: 3,
      syncing: true,
      unit: "m³",
      variable: "",
    },
    {
      alarm: {
        earlyHighThreshold: "",
        earlyLowThreshold: "",
        highThreshold: "",
        lowThreshold: "",
      },
      calibration: {
        formula: "",
        offset: "",
        positive: false,
        slope: "",
      },
      configuration: {
        customize: {
          total: {
            autoSlope: true,
            sensorId: 2,
            totalId: 0,
            totalMode: 1,
          },
        },
        http: {
          wtw: {
            sid: 0,
            vid: 0,
          },
        },
        modbus: {
          standard: {
            dataType: 0,
            deviceAddress: 0,
            endian: 0,
            registerType: 4,
            startAddress: 0,
          },
        },
        serial: {
          sigas: {
            index: 0,
          },
          systea: {
            index: 0,
            line: 0,
          },
          teom: {
            channelNumber: "K0",
            prc: 0,
            stationNumber: 4,
          },
          young: {
            index: 0,
          },
        },
        sql: {
          dcs: {
            column: "",
            dataType: 0,
            required: false,
            table: "",
          },
          standard: {
            column: "",
            columnIndex: -1,
            dataType: 0,
            database: "",
            table: "",
          },
        },
        view: {
          common: {
            index: 8,
            visible: true,
          },
          grid: {
            columnSpan: 1,
            rowSpan: 1,
          },
        },
      },
      configurations:
        '{ "customize": { "total": { "autoSlope": true, "sensorId": 2, "totalId": 0, "totalMode": 1 } }, "http": { "wtw": { "sid": 0, "vid": 0 } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "serial": { "sigas": { "index": 0 }, "systea": { "index": 0, "line": 0 }, "teom": { "channelNumber": "K0", "prc": 0, "stationNumber": 4 }, "young": { "index": 0 } }, "sql": { "dcs": { "column": "", "dataType": 0, "required": false, "table": "" }, "standard": { "column": "", "columnIndex": -1, "dataType": 0, "database": "", "table": "" } }, "view": { "common": { "index": 8, "visible": true }, "grid": { "columnSpan": 1, "rowSpan": 1 } } }',
      connectionId: 7,
      enableAlarm: false,
      enableCalibration: false,
      enabled: true,
      id: 4,
      model: 1,
      name: "Total out",
      precision: 2,
      protocol: 5,
      sensorStatus: {
        configuration: {
          customize: {
            dependency: {
              formula: "",
            },
          },
          modbus: {
            standard: {
              dataType: 0,
              deviceAddress: 0,
              endian: 0,
              registerType: 4,
              startAddress: 0,
            },
          },
          validation: {
            calibrating: "1",
            erroring: "2",
            measuring: "0",
            precision: 1,
          },
        },
        configurations:
          '{ "customize": { "dependency": { "formula": "" } }, "modbus": { "standard": { "dataType": 0, "deviceAddress": 0, "endian": 0, "registerType": 4, "startAddress": 0 } }, "validation": { "calibrating": "1", "erroring": "2", "measuring": "0", "precision": 1 } }',
        connectionId: 0,
        enabled: false,
        model: 0,
        protocol: 0,
        sensorId: 4,
      },
      status: 3,
      syncing: true,
      unit: "m³",
      variable: "",
    },
  ],
};

export default sensorsList;
