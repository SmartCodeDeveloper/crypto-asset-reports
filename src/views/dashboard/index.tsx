import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import CoinTable from '@/components/CoinTable';
import { SearchBar } from '@/components/SearchBar';
import { CoinsApi } from '@/api';
import { CryptoAsset } from '@/types/response/ResponseCoin';

export default function UserReports() {
  const searchbarBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );


  const { data: coinsData, loading: loadingCoins } = useRequest(() => CoinsApi.getCoins())

	return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex
        w={{ sm: "100%", md: "auto" }}
        alignItems="center"
        flexDirection="row"
        bg={searchbarBg}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        p="10px"
        borderRadius="30px"
        mb="24px"
        boxShadow={shadow}
      >
        <SearchBar
          mb={{ base: "10px", md: "unset" }}
          me="10px"
          borderRadius="30px"
        />
      </Flex>
      {loadingCoins && <div>Loading....</div>}
      {!loadingCoins && coinsData && (
        <CoinTable
          tableData={coinsData.data.map((coin: CryptoAsset, index: number) => ({
            num: index,
            coin: coin.name,
            price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            total_volume: coin.total_volume,
            market_cap: coin.market_cap,
          }))}
        />
      )}
    </Box>
  );
}
