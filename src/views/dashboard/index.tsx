import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRequest } from "ahooks";
import { CoinsApi } from "@/api";
import { CryptoAsset } from "@/types/response/ResponseCoin";
import CoinTable from "@/components/CoinTable";
import { SearchBar } from "@/components/SearchBar";
import Card from "@/components/Card/Card";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useCallback, useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { createFilterToken, useSortedTokensByQuery } from '@/utils/filtering';
import { isAddress } from "@/utils";

export default function UserReports() {
  const searchbarBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const { data: coinsData, loading: loadingCoins } = useRequest(() =>
    CoinsApi.getCoins()
  );

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 500)


  const filteredTokens: CryptoAsset[] = useMemo(() => {
    const filterToken = createFilterToken(debouncedQuery)
    return coinsData ? coinsData.data?.filter(filterToken) : []
  }, [coinsData, debouncedQuery])

  const filteredQueryTokens = useSortedTokensByQuery(filteredTokens, debouncedQuery)

  const filteredSortedTokens: CryptoAsset[] = useMemo(() => filteredQueryTokens, [filteredQueryTokens])


  const handleInput = useCallback((event: any) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

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
          value={searchQuery}
          change={handleInput} 
        />
      </Flex>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        {loadingCoins && <SkeletonTable cols={6}/>}
        {!loadingCoins && coinsData && (
          <CoinTable
            tableData={filteredSortedTokens.map(
              (coin: CryptoAsset, index: number) => ({
                num: index,
                coin: {id: coin.id, name: coin.name, symbol: coin.symbol, icon: coin.image},
                price: coin.current_price,
                price_change_percentage_24h: coin.price_change_percentage_24h,
                total_volume: coin.total_volume,
                market_cap: coin.market_cap,
              })
            )}
          />
        )}
      </Card>
    </Box>
  );
}
