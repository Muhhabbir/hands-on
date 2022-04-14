import { Box, Flex, Image, Button, Text, Spacer } from "@chakra-ui/react";

const Song = ({ uri, image, title, album, selectState, isSelected }) => {
  return (
    <>
      <Box
        bgColor="gray.700"
        borderRadius="md"
        p="2"
        mb="2"
        ml="10"
        mr="10"
        onClick={() => selectState(uri)}
      >
        <Flex align="center">
          <Box>
            <Flex align="center">
              <Image
                src={image}
                alt="Album"
                boxSize="100px"
                borderRadius="md"
              />
              <Box ml="2">
                <Text fontSize="lg" fontWeight="bold" textAlign="left">
                  {title}
                </Text>
                <Text color="gray.400" textAlign="left">{album}</Text>
              </Box>
            </Flex>
          </Box>
          <Spacer />
          <Button
            colorScheme="green"
            onClick={() => {
              selectState(uri);
            }}
          >
            {isSelected ? "Deselect" : "Select"}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Song;