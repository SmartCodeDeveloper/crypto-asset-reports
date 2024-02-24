import { Text, useColorModeValue, Flex, Skeleton } from "@chakra-ui/react";

const CoinInfoItemSkeleton = (props: { label: string }) => {
  const { label } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex position="relative" align="center" justifyContent={"space-between"}>
      <Flex
        me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
        align="center"
      >
        <Text fontWeight="500" fontSize="sm" color={textColor}>
          {label}
        </Text>
      </Flex>
      <Skeleton h={"20px"} w={"100px"} />
    </Flex>
  );
};

export default CoinInfoItemSkeleton;
