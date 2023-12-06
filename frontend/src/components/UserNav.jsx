import { Box, Text, Icon, Spacer, Button } from "@chakra-ui/react";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

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
        onClick={logout}
        variant="ghost"
        color="blackAlpha.700"
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserNav;
