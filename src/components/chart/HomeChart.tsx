import { Box, Card, useTheme } from "@mui/material";
import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "src/components/chart/BaseOptionChart";
// import axios from "src/utils/axios";
import moment from "moment";
import chartData from "src/data/chartData";

// Define the types for the props
interface Sensor {
  id: string;
  name: string;
  unit: string;
}

interface HomeChartProps {
  sensor: Sensor;
  from: Date;
  to: Date;
  height: number;
}

const HomeChart: React.FC<HomeChartProps> = ({ sensor, from, to, height }) => {
  const theme = useTheme();

  const [times, setTimes] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);

  let fetchInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    fetchInterval = setInterval(getLine, 3000);
    return () => {
      if (fetchInterval) clearInterval(fetchInterval);
    };
  }, [sensor, startAt, endAt]);

  useEffect(() => {
    const start = new Date(from);
    start.setHours(0, 0, 0, 0);
    setStartAt(start);

    const end = new Date(to);
    end.setHours(23, 59, 59, 999);
    setEndAt(end);
  }, [from, to]);

  const getLine = () => {
    if (startAt && endAt) {
      fetchData(startAt.getTime(), endAt.getTime());
    }
  };

  const fetchData = async (_from: number, _to: number) => {
    try {
      const response = chartData;

      setTimes(response.data.times);
      setValues(response.data.values.map((item) => Number(item)));

      if (response.data.values.length > 0 && fetchInterval) {
        console.log(`clean interval`);
        clearInterval(fetchInterval);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    colors: [theme.palette.primary.main],
    chart: {
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        autoSelected: "zoom",
      },
      stacked: false,
    },
    title: {
      text: `${sensor?.name} (${sensor?.unit})`,
      align: "left",
      style: {
        fontWeight: "bold",
        color: theme.palette.text.secondary,
      },
    },
    xaxis: {
      categories: times.map((time) =>
        moment(time).format(from === to ? "HH:mm" : "HH:mm DD-MM-YY")
      ),
      tickAmount: 10,
    },
  });

  return (
    <Card>
      <Box
        sx={{
          mt: 1.5,
          mx: 0,
          mb: 0,
        }}
        dir="ltr">
        <ReactApexChart
          type="area"
          series={[
            {
              name: sensor?.name,
              data: values,
            },
          ]}
          options={chartOptions as any}
          height={height}
        />
      </Box>
    </Card>
  );
};

export default HomeChart;
