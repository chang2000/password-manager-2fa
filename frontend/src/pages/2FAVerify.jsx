import Navbar from "../components/Navbar";
import axios from "axios";
import { VStack, useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import VerificationInput from "../components/VerificationInput";
const TwoFASetup = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const email = useLocation().state?.email || "";

  const handleVerificationInput = (inputValue) => {
    console.log("in father compnent", inputValue);
    axios
      .post("/api/auth/verify", { email: email, token: inputValue })
      .then((response) => {
        const { success, token } = response.data;
        console.log(response.data);
        if (success) {
          toast({
            title: "Login Success",
            status: "success",
            isClosable: true,
          });
          console.log("success 2fa verification");
          sessionStorage.setItem("token", token);

          // eslint-disable-next-line react/prop-types
          props.loginRes({ isLogged: success, authToken: token });
          navigate("/userpage");
          // navigate("/");
        }
      })
      .catch((err) => {
        const { success, error } = err.response.data;
        if (!success) {
          toast({
            title: error,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  return (
    <div>
      <Navbar btnName="Login" path="/" />
      <Flex
        h="100vh"
        direction="column"
        alignItems="center"
        backgroundColor="blackAlpha.50"
      >
        <Box
          mt={{ base: "15em", xl: "15em" }}
          backgroundColor="white"
          borderRadius="20px"
          w={{ base: "90%", md: "60%", xl: "40%" }}
          p={{ base: "3em", md: "3.5em", xl: "4em" }}
          boxShadow="lg"
          gap="2em"
          display="flex"
          flexDirection="column"
        >
          <Heading
            align="center"
            fontSize={{ base: "xl", xl: "2xl" }}
            color="blackAlpha.700"
          >
            Verify 2FA
          </Heading>
          <VStack>
            <Text
              as="span"
              color="blackAlpha.700"
              whiteSpace="nowrap"
              fontSize={{ base: "md", xl: "xl" }}
              align="center"
            >
              Enter your code from your authenticator:
            </Text>
            <VerificationInput onInputComplete={handleVerificationInput} />
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};

export default TwoFASetup;
