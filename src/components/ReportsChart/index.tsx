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
  const bgColor = useColorModeValue('#fff', 'navy.800');

  return (
    <Card bg={bgColor} w="100%">
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        w="100%"
        mb="0px"
      
      >
        <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
          <Button
            ms="auto"
            alignItems="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
          >
            <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
          </Button>
        </Flex>
        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
          <Flex flexDirection="column" me="20px" mt="28px">
            <Text
              color={textColor}
              fontSize="34px"
              textAlign="start"
              fontWeight="700"
              lineHeight="100%"
            >
              $37.5K
            </Text>
            <Flex align="center" mb="20px">
              <Text
                color="secondaryGray.600"
                fontSize="sm"
                fontWeight="500"
                mt="4px"
                me="12px"
              >
                Total Spent
              </Text>
              <Flex align="center">
                <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
                <Text color="green.500" fontSize="sm" fontWeight="700">
                  +2.45%
                </Text>
              </Flex>
            </Flex>

            <Flex align="center">
              <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
              <Text color="green.500" fontSize="md" fontWeight="700">
                On track
              </Text>
            </Flex>
          </Flex>
          <Box minH="260px" minW="75%" mt="auto">
            {coinMarketChartData && <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />}
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
