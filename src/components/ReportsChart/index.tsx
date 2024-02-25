import { useEffect, useState } from "react";
import {
  Flex,
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
          from = to - 24 * 60 * 60;
          break;
        case DurationType.Week:
          from = to - 7 * 24 * 60 * 60;
          break;
        case DurationType.Month:
          from = to - 30 * 24 * 60 * 60;
          break;
        case DurationType.Quarter:
          from = to - 3 * 30 * 24 * 60 * 60;
          break;
        case DurationType.Year:
          from = to - 365 * 24 * 60 * 60;
          break;
        default:
          from = to - 24 * 60 * 60;
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
      <Flex w="100%" justifyContent="end" mb="24px">
        <ButtonGroup gap="1">
          <Button w="40px" h="40px" borderRadius="8px" onClick={() => setDuration(DurationType.Day)}>24h</Button>
          <Button w="40px" h="40px" borderRadius="8px" onClick={() => setDuration(DurationType.Week)}>7d</Button>
          <Button w="40px" h="40px" borderRadius="8px" onClick={() => setDuration(DurationType.Month)}>1m</Button>
          <Button w="40px" h="40px" borderRadius="8px" onClick={() => setDuration(DurationType.Quarter)}>3m</Button>
          <Button w="40px" h="40px" borderRadius="8px" onClick={() => setDuration(DurationType.Year)}>1y</Button>
        </ButtonGroup>
      </Flex>
      {!loadingCoinMarketChartData && coinMarketChartData ? (
        <LineChart
          chartData={lineChartData}
          chartOptions={lineChartOptions}
        />
      ) : (
        <Skeleton h={"300px"} />
      )}
    </Box>
  );
}
