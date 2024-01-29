import { Box, Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box bg="gray.100" px={4} py={4} shadow="md">
      <Flex alignItems="center" maxW="800px">
        <Heading size="md" ml="30px" mr="auto" >Weather Info Monitoring App</Heading>
      </Flex>
    </Box>
  );
}