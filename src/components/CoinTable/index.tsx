import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  formatColor,
  formatPercentage,
  formatPrice,
  formattedPriceWithoutDecimals,
} from "@/utils";

export type FieldType = {
  num: number;
  coin: string;
  price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
};

const columnHelper = createColumnHelper<FieldType>();

export default function CoinTable(props: { tableData: any }) {
  const { tableData } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const columns = [
    columnHelper.accessor("num", {
      id: "num",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          #
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue() + 1}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("coin", {
      id: "coin",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Coin
        </Text>
      ),
      cell: (info) => {
        const coinInfo: any = info.getValue();
        return (
          <Flex align="center">
            {coinInfo.icon ? (
              <Image
                borderRadius="full"
                boxSize="24px"
                src={coinInfo.icon}
                alt={coinInfo.symbol}
              />
            ) : (
              <Icon w="24px" h="24px" me="5px" color="gray.400" />
            )}
            <Text color={textColor} fontSize="sm" fontWeight="700" mx={2}>
              {coinInfo.name}
            </Text>
            <Text
              color={borderColor}
              textTransform={"uppercase"}
              fontSize="sm"
              fontWeight="700"
            >
              {coinInfo.symbol}
            </Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Price
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {formatPrice(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor("price_change_percentage_24h", {
      id: "price_change_percentage_24h",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          24h
        </Text>
      ),
      cell: (info) => (
        <Text
          color={formatColor(info.getValue())}
          fontSize="sm"
          fontWeight="700"
        >
          {formatPercentage(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor("total_volume", {
      id: "total_volume",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Total Volume
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {formattedPriceWithoutDecimals(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor("market_cap", {
      id: "market_cap",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Market Cap
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {formattedPriceWithoutDecimals(info.getValue())}
        </Text>
      ),
    }),
  ];
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Box>
      <Table variant="simple" color="gray.500" mb="24px" mt="12px">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: "",
                        desc: "",
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table
            .getRowModel()
            .rows.slice(0, 11)
            .map((row: any) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        <Link to={`/assets/${row.original.coin.id}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>

      <Divider orientation="horizontal" />
      <Flex justifyContent={"space-between"} px={5} pt={5}>
        <Flex w={"full"}>
          <Text>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
        </Flex>
        <Flex gap={2}>
          <Button
            variant="outline"
            borderRadius={12}
            padding={2}
            fontSize={"14px"}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            <FaChevronLeft />
          </Button>
          <Button
            variant="outline"
            borderRadius={12}
            padding={2}
            fontSize={"14px"}
          >
            {table.getState().pagination.pageIndex + 1}
          </Button>
          <Button
            variant="outline"
            borderRadius={12}
            padding={2}
            fontSize={"14px"}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            <FaChevronRight />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
