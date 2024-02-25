import { Box, Stack, StackDivider, Heading, Skeleton } from "@chakra-ui/react";
import { useRequest } from "ahooks";
import { CoinsApi } from "@/api";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import CoinMarketData from "@/components/CoinMarketData";
import ReportsChart from "@/components/ReportsChart";
import Card from "@/components/Card/Card";
import SkeletonCoinInfo from "@/components/Skeleton/SkeletonCoinInfo";

const Details = () => {
  const param = useParams<any>();

  const { data: coinDetails, loading: loadingCoinDetails } = useRequest(() =>
    CoinsApi.getCoinDetails(param.id)
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "hidden", lg: "hidden" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          h="full"
          py={4}
          px={10}
          gap={10}
          divider={<StackDivider />}
        >
          {!loadingCoinDetails && coinDetails ? (
            <CoinMarketData data={coinDetails.data} />
          ) : (
            <SkeletonCoinInfo />
          )}

          <Stack w={{ md: "70%", sm: "full" }} spacing={10}>
            <ReportsChart id={param.id} />
            <Stack spacing={8} w={"full"}>
              <Box as={"header"}>
                {!loadingCoinDetails && coinDetails ? (
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "md", sm: "md", lg: "2xl" }}
                  >
                    About {coinDetails.data.name}
                  </Heading>
                ) : (
                  <Skeleton h={"40px"} w={"300px"} />
                )}
              </Box>

              <Box id="coin_description">
                {!loadingCoinDetails && coinDetails ? (
                  ReactHtmlParser(coinDetails.data.description.en)
                ) : (
                  <Skeleton h={"300px"} />
                )}
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default Details;
