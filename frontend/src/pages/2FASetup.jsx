import Navbar from "../components/Navbar";
import axios from "axios";
import { useToast, Heading, Flex, Box, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import VerificationInput from "../components/VerificationInput";
const TwoFASetup = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const twoFA_Url = useLocation().state?.twoFA_Url || "https://www.example.com";
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
            title: "2FA setup success",
            status: "success",
            isClosable: true,
          });
          console.log("success 2fa setup");
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
        justifyContent="center"
        backgroundColor="blackAlpha.50"
      >
        <Box
          backgroundColor="white"
          borderRadius="20px"
          p={{ base: "3em", md: "3.5em", xl: "4em" }}
          boxShadow="lg"
          gap="1.5em"
          display="flex"
          flexDirection="column"
        >
          <Heading
            align="center"
            fontSize={{ base: "xl", xl: "2xl" }}
            color="blackAlpha.700"
          >
            Set up 2FA
          </Heading>
          <VStack>
            <Text
              as="span"
              color="blackAlpha.700"
              whiteSpace="nowrap"
              fontSize={{ base: "md", xl: "xl" }}
            >
              Please scan following QR Code to retrieve the code:
            </Text>
            <QRCodeSVG value={twoFA_Url} />
          </VStack>
          <VStack>
            <Text
              as="span"
              color="blackAlpha.700"
              whiteSpace="nowrap"
              fontSize={{ base: "md", xl: "xl" }}
            >
              Please enter the code below:
            </Text>
            <VerificationInput onInputComplete={handleVerificationInput} />
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};

export default TwoFASetup;
