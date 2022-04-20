import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducer/slicer";
import url from "../../spotipi/spotify";
import { Center, Box, Link } from "@chakra-ui/react";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(getToken()));
  }, [dispatch]);

  const getToken = () => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");

    return accessToken;
  };

  return (
    <>
      <Center h="200px">
        <Box p="5" bgColor="blue.400" borderRadius="20px">
              <Link href={url} color="black">
                Login To Spotify
              </Link>
        </Box>
      </Center>
    </>
  );
};

export default LoginPage;