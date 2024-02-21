import { Box, Flex, Stack } from "@chakra-ui/react";
import Logo from "@/components/Sidebar/components/Logo";
import Links from "@/components/Sidebar/components/Links";

const SidebarContent = (props: { routes: RoutesType[] }) => {
  const { routes } = props;

  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Logo />
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px" pe={{ lg: "16px", "2xl": "16px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ lg: "16px", "2xl": "20px" }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      >
      </Box>
    </Flex>
  );
}

export default SidebarContent;
