import { Card, Text, Box, Grid, Flex, Link, Image, useColorModeValue, HStack } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import { CoinsApi } from '@/api';

export default function CoinDetails() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const bgColor = useColorModeValue('#fff', 'navy.800');
  const cardBgColor = useColorModeValue('#fff', 'navy.700');
  const brandColor = useColorModeValue('brand.500', 'white');

  const { data: coinDetails, loading: loadingCoinDetails } = useRequest(() => CoinsApi.getCoinDetails('ethereum'));

  return (
    <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} w='400px'>
      {coinDetails && (
        <Card mb={{ base: "0px", "2xl": "20px" }} p="16px" bg={bgColor}>
          <HStack>
            <Image h='24px' w='24px' src={coinDetails.data.image.small} borderRadius='50%' me='20px' />
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mb="4px"
            >
              {coinDetails.data.name}
            </Text>
          </HStack>
          <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
            {coinDetails.data.description.en}
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
                  {coinDetails.data.market_data.market_cap.usd}
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
                  {coinDetails.data.market_data.fully_diluted_valuation.usd}
                </Text>
              </HStack>
            </Box>
          </Card>
        </Card>
      )}
    </Flex>
  );
}