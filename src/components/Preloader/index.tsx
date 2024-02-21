import { Box, useColorModeValue } from "@chakra-ui/react";

const PreLoader = () => {
  return (
    <Box id="loader-wrapper">
      <Box id="loader"></Box>
      <Box
        className="loader-section section-left"
        bg={useColorModeValue("white", "gray.800")}
      ></Box>
      <Box
        className="loader-section section-right"
        bg={useColorModeValue("white", "gray.800")}
      ></Box>
    </Box>
  );
};
export default PreLoader;
