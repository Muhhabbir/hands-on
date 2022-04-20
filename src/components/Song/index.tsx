import { Box, Flex, Image, Button, Text, Spacer } from "@chakra-ui/react";

interface songInterface {
  uri: string;
  image: string;
  title: string;
  album: string;
  artists: string;
  duration: number;
  selectState: (uri: string) => void;
  isSelected: boolean;
}

const millisToMinutesAndSeconds = (millis: number) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Song = ({ uri, image, title, album, artists, duration, selectState, isSelected }: songInterface) => {
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
                data-testid="song-image"
              />
              <Box ml="2">
                <Text fontSize="lg" fontWeight="bold" textAlign="left" data-testid="song-title">
                  {title}
                </Text>
                <Text color="gray.400" data-tesstid="song-album" textAlign="left">{album}</Text>
                <Text color="gray.400" textAlign="left">{artists}</Text>
                <Text color="gray.400" textAlign="left">{millisToMinutesAndSeconds(duration)}</Text>
              </Box>
            </Flex>
          </Box>
          <Spacer />
          <Button
            colorScheme="blue"
            onClick={() => {
              selectState(uri);
            }}
            data-testid="song-button"
          >
            {isSelected ? "Deselect" : "Select"}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Song;