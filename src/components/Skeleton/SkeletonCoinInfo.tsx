import {
  Text,
  Box,
  useColorModeValue,
  StackDivider,
  Stack,
  Flex,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import CoinInfoItemSkeleton from "./CoinInfoItemSkeleton";

export default function SkeletonCoinInfo() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.500");

  return (
    <Stack spacing={8} w={{ md: "30%", sm: "full" }}>
      <Box as={"header"}>
        <Flex align="center" gap={2} mb={2}>
          <SkeletonCircle size="8" />
          <Skeleton height="20px" w={"60px"} />
          <Skeleton height="20px" w={"50px"} />
        </Flex>

        <Skeleton height="30px" w={"200px"} />
      </Box>

      <Stack spacing={2} divider={<StackDivider borderColor={borderColor} />}>
        <CoinInfoItemSkeleton label="Ranking" />
        <CoinInfoItemSkeleton label="Market cap" />
        <CoinInfoItemSkeleton label="Volume (24h)" />
        <CoinInfoItemSkeleton label="Volume/Market cap (24h)" />
        <CoinInfoItemSkeleton label="Circulating Supply" />
        <CoinInfoItemSkeleton label="Total supply" />
        <CoinInfoItemSkeleton label="Max. supply" />
        <CoinInfoItemSkeleton label="Fully diluted market cap" />
      </Stack>
      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Official links
        </Text>
        <Skeleton height="30px" />
      </Stack>

      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Socials
        </Text>
        <Skeleton height="30px" />
      </Stack>

      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Networks
        </Text>
        <Skeleton height="30px" />
      </Stack>
    </Stack>
  );
}
