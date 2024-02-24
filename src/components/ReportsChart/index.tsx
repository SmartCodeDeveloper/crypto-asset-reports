import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Card,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRequest } from "ahooks";
import LineChart from "./LinChart";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
import { RiArrowUpSFill } from "react-icons/ri";
import { CoinsApi } from "@/api";


export default function ReportsChart(props: { coinId: string, from: number, to: number }) {

  const { coinId, from, to } = props;
  const { data: coinMarketChartData, loading: loadingCoinMarketChartData } = useRequest(() => CoinsApi.getCoinMarketChartData(coinId, from.toString(), to.toString()));

  const averagePrice = coinMarketChartData && coinMarketChartData.data.prices.reduce((total, price) => total + price[1], 0) / coinMarketChartData?.data.prices.length;

  const lineChartData = [
    {
      name: "Price",
      data: averagePrice && coinMarketChartData && coinMarketChartData.data.prices.map((price) => price[1] - averagePrice),
    }
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
      categories: [1, 2, 3, 4, 5],
      labels: {
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
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const bgColor = useColorModeValue("#fff", "navy.800");

  return (
    <Box minH="260px" minW="75%" mb={0}>
      <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />
    </Box>
  );
}
