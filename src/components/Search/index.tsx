import {
    Box,
    Button,
    Center,
    InputGroup,
    Input,
  } from "@chakra-ui/react";

  interface searchInterface {
    setSearchSong: (value: string) => void;
    getSong: () => void;
  }
  
  const Search = ({ setSearchSong, getSong }: searchInterface) => {
    return (
        <>
        <Center>
          <Box w="sm">
            <InputGroup mb="3">
                <Input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  variant="filled"
                  aria-label="Search"
                  onChange={(e) => setSearchSong(e.target.value)}
                />
                <Button size="md" type="button" colorScheme="green" onClick={getSong}>
                  Search
                </Button>
            </InputGroup>
          </Box>
        </Center>
      </>
    );
  };
  
  export default Search;