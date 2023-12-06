/* eslint-disable react/prop-types */
import { Box, Button, Icon, Spacer, Text } from "@chakra-ui/react";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      pos="fixed"
      w="100%"
      backgroundColor="white"
      h="4rem"
      boxShadow="lg"
      px={{ base: "2em", xl: "4em" }}
      display="flex"
      alignItems="center"
    >
      <Icon mr="0.5em" color="blackAlpha.700" as={KeyRoundedIcon} />
      <Text fontSize="xl" fontWeight="700" color="blackAlpha.700">
        Password Manager
      </Text>
      <Spacer />
      <Button
        onClick={() => navigate(props.path)}
        variant="ghost"
        color="blackAlpha.700"
      >
        {props.btnName}
      </Button>
    </Box>
  );
};

export default Navbar;
