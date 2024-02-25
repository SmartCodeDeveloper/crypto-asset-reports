import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRequest } from "ahooks";
import LineChart from "./LinChart";
import { Skeleton } from "@chakra-ui/react";
import { CoinsApi } from "@/api";
import { formatTimestampToDayMonth, formatTimestampToHour } from "@/utils/chart";
import { formatPrice } from "@/utils";

enum DurationType {
  Day = "1D",
  Week = "7D",
  Month = "1M",
  Quarter = "3M",
  Year = "1Y",
}

export default function ReportsChart(props: {id: string}) {
  const { id } = props;
  const to = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const [duration, setDuration] = useState<DurationType>(DurationType.Day);
  const {
    data: coinMarketChartData,
    loading: loadingCoinMarketChartData,
    run: getCoinMarketChartData,
  } = useRequest(
    () => {
      let from;
      switch (duration) {
        case DurationType.Day:
          from = to - 24 * 60 * 60; // 1 day
          break;
        case DurationType.Week:
          from = to - 7 * 24 * 60 * 60; // 1 week
          break;
        case DurationType.Month:
          from = to - 30 * 24 * 60 * 60; // 1 month (approximated to 30 days)
          break;
        case DurationType.Quarter:
          from = to - 3 * 30 * 24 * 60 * 60; // 3 months (approximated to 90 days)
          break;
        case DurationType.Year:
          from = to - 365 * 24 * 60 * 60; // 1 year (approximated to 365 days)
          break;
        default:
          from = to - 24 * 60 * 60; // Default to 1 day
      }
      return CoinsApi.getCoinMarketChartData(
        id,
        from.toString(),
        to.toString()
      );
    },
    {
      manual: true,
    }
  );

  const averagePrice =
    coinMarketChartData &&
    coinMarketChartData.data.prices.reduce(
      (total: number, price: [number, number]) => total + price[1],
      0
    ) / coinMarketChartData.data.prices.length;
  
  const generateXCategories = (timestamps: number[], durationType: DurationType) => {
    let categories = [];
    switch (durationType) {
        case DurationType.Day: // 1 day
          categories = timestamps.map((timestamp, index) => index % 24 === 0 ? formatTimestampToHour(timestamp) : '');
          console.log(categories);
          break;
  
        case DurationType.Week: // 1 week
            categories = timestamps.map((timestamp, index) => index % 24 === 0 ? formatTimestampToDayMonth(timestamp) : '');
            break;
  
        case DurationType.Month: // 1 month
            categories = timestamps.map((timestamp, index) => index % 48 === 0 ? formatTimestampToDayMonth(timestamp) : '');
            break;

        case DurationType.Quarter: // 3 months
            categories = timestamps.map((timestamp, index) => index % 144 === 0 ? formatTimestampToDayMonth(timestamp) : '');
            break;

        case DurationType.Year: // 1 year
            categories = timestamps.map((timestamp, index) => index % 60 === 0 ? formatTimestampToDayMonth(timestamp) : '');
            break;
  
        default:
            categories = timestamps.map((timestamp, index) => index % 24 === 0 ? formatTimestampToHour(timestamp) : '');
            break;
    }
    return categories;
  };

  const lineChartData = [
    {
      name: "Price",
      data:
        averagePrice &&
        coinMarketChartData &&
        coinMarketChartData.data.prices.map(
          (price: [number, number]) => price[1]
        ),
    },
  ];

  const lineChartOptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories:
        coinMarketChartData && generateXCategories(coinMarketChartData.data.prices.map((price) => price[0]), duration),
      labels: {
        rotate: 0,
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
        formatter: (value: number) => {
          return formatPrice(value)
        }
      },
      show: true,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      row: {
        color: "#7551FF",
        opacity: 0.2,
      },
    }
  };

  useEffect(() => {
    getCoinMarketChartData();
  }, [duration]);

  return (
    <Box minH="260px" minW="75%" mb={0}>
      {!loadingCoinMarketChartData && coinMarketChartData ? (
        <Box>
          <ButtonGroup gap="4">
            <Button onClick={() => setDuration(DurationType.Day)}>24h</Button>
            <Button onClick={() => setDuration(DurationType.Week)}>7d</Button>
            <Button onClick={() => setDuration(DurationType.Month)}>1m</Button>
            <Button onClick={() => setDuration(DurationType.Quarter)}>
              3m
            </Button>
            <Button onClick={() => setDuration(DurationType.Year)}>1y</Button>
          </ButtonGroup>
          <LineChart
            chartData={lineChartData}
            chartOptions={lineChartOptions}
          />
        </Box>
      ) : (
        <Skeleton h={"300px"} />
      )}
    </Box>
  );
}
