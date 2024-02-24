import {
  Text,
  Box,
  Image,
  useColorModeValue,
  StackDivider,
  Stack,
  Heading,
  Flex,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { AssetDetails } from "@/types/response/ResponseCoinDetails";
import {
  formatPercentage,
  formatPercentageOrigin,
  formatPrice,
  formattedAmountWithSymbol,
  formattedPriceWithoutDecimals,
} from "@/utils";
import CoinInfoItem from "./CoinInfoItem";
import { FiGlobe, FiFile, FiGithub } from "react-icons/fi";
import { AiFillRedditCircle } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function CoinMarketData(props: { data: AssetDetails }) {
  const { data } = props;
  console.log("data", data);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.500");

  return (
    <Stack spacing={8} w={{ md: "30%", sm: "full" }}>
      <Box as={"header"}>
        <Flex align="center">
          {data.image ? (
            <Image
              borderRadius="full"
              boxSize="24px"
              src={data.image.small}
              alt={data.symbol}
            />
          ) : (
            <Icon w="24px" h="24px" me="5px" color="gray.400" />
          )}
          <Text color={textColor} fontWeight={600} fontSize={"xl"} mx={2}>
            {data.name}
          </Text>
          <Text
            color={borderColor}
            textTransform={"uppercase"}
            fontWeight={600}
            fontSize={"sm"}
          >
            {data.symbol}
          </Text>
        </Flex>

        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          {formatPrice(data.market_data.current_price.usd)}
        </Heading>
      </Box>

      <Stack spacing={2} divider={<StackDivider borderColor={borderColor} />}>
        <CoinInfoItem
          label="Ranking"
          value={`#${data.market_data.market_cap_rank}`}
        />
        <CoinInfoItem
          label="Market cap"
          value={formattedPriceWithoutDecimals(data.market_data.market_cap.usd)}
        />
        <CoinInfoItem
          label="Volume (24h)"
          value={formattedPriceWithoutDecimals(
            data.market_data.total_volume.usd
          )}
        />
        <CoinInfoItem
          label="Volume/Market cap (24h)"
          value={formatPercentageOrigin(
            data.market_data.total_volume.usd / data.market_data.market_cap.usd
          )}
        />
        <CoinInfoItem
          label="Circulating Supply"
          value={formattedAmountWithSymbol(
            data.market_data.circulating_supply,
            data.symbol
          )}
        />
        <CoinInfoItem
          label="Total supply"
          value={formattedAmountWithSymbol(
            data.market_data.total_supply,
            data.symbol
          )}
        />
        <CoinInfoItem
          label="Max. supply"
          value={formattedAmountWithSymbol(
            data.market_data.max_supply,
            data.symbol
          )}
        />
        <CoinInfoItem
          label="Fully diluted market cap"
          value={formattedPriceWithoutDecimals(
            data.market_data.fully_diluted_valuation.usd
          )}
        />
      </Stack>
      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Official links
        </Text>
        <Flex gap={3}>
          {data.links.homepage && data.links.homepage[0] && (
            <Link href={data.links.homepage[0]} isExternal>
              <Tag size={"sm"} variant="subtle" colorScheme="gray">
                <TagLeftIcon boxSize="12px" as={FiGlobe} />
                <TagLabel>Website</TagLabel>
              </Tag>
            </Link>
          )}
          {data.links.whitepaper && (
            <Link href={data.links.whitepaper} isExternal>
              <Tag size={"sm"} variant="subtle" colorScheme="gray">
                <TagLeftIcon boxSize="12px" as={FiFile} />
                <TagLabel>Whitepaper</TagLabel>
              </Tag>
            </Link>
          )}
          {data.links.repos_url.github && data.links.repos_url.github[0] && (
            <Link href={data.links.repos_url.github[0]} isExternal>
              <Tag size={"sm"} variant="subtle" colorScheme="gray">
                <TagLeftIcon boxSize="12px" as={FiGithub} />
                <TagLabel>GitHub</TagLabel>
              </Tag>
            </Link>
          )}
        </Flex>
      </Stack>

      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Socials
        </Text>
        <Flex gap={3}>
          {data.links.subreddit_url && (
            <Link href={data.links.subreddit_url} isExternal>
              <Tag size={"sm"} variant="subtle" colorScheme="gray">
                <TagLeftIcon boxSize="14px" as={AiFillRedditCircle} />
                <TagLabel>Reddit</TagLabel>
              </Tag>
            </Link>
          )}
        </Flex>
      </Stack>

      <Stack spacing={2}>
        <Text color={textColor} fontWeight={600} fontSize={"md"}>
          Networks
        </Text>
        <Flex gap={3}>
          <Menu>
            <MenuButton
              as={Button}
              h="32px"
              borderRadius={10}
              fontSize={"xs"}
              rightIcon={<ChevronDownIcon />}
            >
              Explorers
            </MenuButton>
            <MenuList>
              {data.links.blockchain_site &&
                data.links.blockchain_site.map((site: any) => {
                  if (!site) return;
                  return (
                    <MenuItem as="a" fontSize={"xs"} href={site}>
                      {site}
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>
        </Flex>
      </Stack>
    </Stack>
  );
}
