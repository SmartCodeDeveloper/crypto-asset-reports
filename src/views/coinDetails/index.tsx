import { Flex, HStack } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import { CoinsApi } from '@/api';
import CoinMarketData from '@/components/CoinMarketData';
import ReportsChart from '@/components/ReportsChart';

export default function CoinDetails() {
  const { data: coinDetails, loading: loadingCoinDetails } = useRequest(() => CoinsApi.getCoinDetails('ethereum'));
  const to = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const from = to - (24 * 60 * 60); // Timestamp for 24 hours ago
  
  const { data: coinMarketChartData, loading: loadingCoinMarketChartData } = useRequest(() => CoinsApi.getCoinMarketChartData('ethereum', from.toString(), to.toString()));

  console.log('data=====>', coinMarketChartData);

  return (
    <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} direction='row'>
      {coinDetails && (
        <CoinMarketData data={coinDetails.data} />
      )}
      {coinMarketChartData && (
        <ReportsChart />
      )}
    </Flex>
  );
}