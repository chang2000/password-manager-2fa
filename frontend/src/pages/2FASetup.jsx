import Navbar from "../components/Navbar";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useLocation} from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import VerificationInput from "../components/VerificationInput";
const TwoFASetup = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const twoFA_Url = useLocation().state?.twoFA_Url || "https://www.example.com"
  const email = useLocation().state?.email || ""

  const handleVerificationInput = (inputValue) => {
    console.log('in father compnent', inputValue)
    axios
    .post('/api/auth/verify', {email: email, token: inputValue})
    .then((response) => {
      const { success, token } = response.data;
      console.log(response.data)
      if (success) {
        toast({
          title: "2FA setup success",
          status: "success",
          isClosable: true,
        });
        console.log('success 2fa setup')
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
    }
    )
  }

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
        p={{ base: "1.2em", xl: "4.2em" }}
        boxShadow="lg"
      >
        <p>This is the 2fa page</p>
        <p>All users have NOT completed 2fa setup will be redirected here.</p>
        <p>Please scan following QR Code to retrive the code</p>
        <QRCodeSVG value={twoFA_Url} />
        <br></br>
        <p>Please enter the code below</p>
        <VerificationInput onInputComplete={handleVerificationInput}/>
      </Box>
    </Flex>
    </div>
  );
};

export default TwoFASetup;
