import { Text, useColorModeValue, Flex } from "@chakra-ui/react";

const CoinInfoItem = (props: { label: string; value: any }) => {
  const { label, value } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex position="relative" align="center">
      <Flex
        me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
        align="center"
      >
        <Text fontWeight="500" fontSize="sm" color={textColor}>
          {label}
        </Text>
      </Flex>
      <Text ms="auto" fontWeight="700" fontSize="sm" color={textColor}>
        {value}
      </Text>
    </Flex>
  );
};

export default CoinInfoItem;
