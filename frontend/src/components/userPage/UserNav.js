import { HStack, Box, Text, Icon, Spacer, Button } from "@chakra-ui/react";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { useNavigate } from "react-router-dom"

const UserNav = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.clear()
    navigate("/")
  }

  return (
    <Box
      pos="fixed"
      w="100%"
      backgroundColor="white"
      h="4rem"
      boxShadow="lg"
      px="2em"
      zIndex={1}
    >
      <HStack>
        <Text
          mt={{ base: "0.5em", "2xl": "1rem" }}
          mr={{ "2xl": "0" }}
          ml={{ base:"-0.5em", lg:"7em",  "2xl": "18em" }}
          fontSize="xl"
          color="blackAlpha.700"
        >
          Password Manager
        </Text>
        <Icon
          pos="relative"
          top={{ base: "0.3em", "2xl": "0.4em" }}
          color="blackAlpha.700"
          as={KeyRoundedIcon}
        />
        {/* <Text>
          Hello, {props.fName}
        </Text> */}
        <Spacer />
        <Button onClick={logout} top={{ base: ".5em" }} right={{ base:"-1em", lg:"7.5em", "2xl": "28em" }} variant="solid">
          Logout
        </Button>
      </HStack>
    </Box>
  )
}

export default UserNav