import { Card, Text, Box, Image, useColorModeValue, HStack } from '@chakra-ui/react';
import { AssetDetails } from '@/types/response/ResponseCoinDetails';

export default function CoinMarketData(props: { data: AssetDetails }) {
  const { data } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
  const bgColor = useColorModeValue('#fff', 'navy.800');
  const cardBgColor = useColorModeValue('#fff', 'navy.700');

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} p="16px" bg={bgColor} w="400px">
      <HStack>
        <Image h='24px' w='24px' src={data.image.small} borderRadius='50%' me='20px' />
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          {data.name}
        </Text>
      </HStack>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        {data.description.en}
      </Text>
      <Card bg={cardBgColor} p="14px">
        <Box>
          <HStack mt={{ base: "10px", md: "0" }}>
            <Text
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              Market Cap
            </Text>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              {data.market_data.market_cap.usd}
            </Text>
          </HStack>
          <HStack mt={{ base: "10px", md: "0" }}>
            <Text
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              Fully Diluted Valuation
            </Text>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              {data.market_data.fully_diluted_valuation.usd}
            </Text>
          </HStack>
        </Box>
      </Card>
    </Card>

  );
}