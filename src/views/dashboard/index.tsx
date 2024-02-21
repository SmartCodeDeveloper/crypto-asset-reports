import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from '@/components/SearchBar';

export default function UserReports() {
  const searchbarBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex
        w={{ sm: "100%", md: "auto" }}
        alignItems="center"
        flexDirection="row"
        bg={searchbarBg}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
      >
        <SearchBar
          mb={{ base: "10px", md: "unset" }}
          me="10px"
          borderRadius="30px"
        />
      </Flex>
      
			Hello
		</Box>
	);
}
