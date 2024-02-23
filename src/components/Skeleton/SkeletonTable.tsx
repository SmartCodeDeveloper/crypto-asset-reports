import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

const SkeletonTable = (props: { cols: any }) => {
  const { cols } = props;
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const data = Array.from({ length: cols }, () => "skeleton");

  return (
    <Box>
      <Table variant="simple" color="gray.500" mb="24px" mt="12px">
        <Thead>
          <Tr>
            {data.map((item: any, i: any) => (
              <Th key={i} pe="10px" borderColor={borderColor} cursor="pointer">
                <Skeleton height="20px" />
                <Flex
                  justifyContent="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                ></Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 10 }).map((row: any, i: any) => (
            <Tr key={i}>
              {data.map((cell: any, j: any) => {
                return (
                  <Td key={j} pe="10px" borderColor="transparent">
                    <Skeleton height="20px" />
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default SkeletonTable;
