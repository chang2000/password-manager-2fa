import LoginForm from "../components/LoginForm";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const isSubmitted = async (loginVal) => {
    axios
      .post("/api/auth/login", loginVal)
      .then((response) => {
        console.log(response);
        // User not complete 2FA setup
        if (response.status === 202) {
          toast({
            title: "Please complete 2FA setup",
            status: "info",
            isClosable: true,
          });
          console.log(response.data);
          const qrCodeUrl = response.data.data.qrCodeUrl;
          const email = response.data.data.email;
          console.log(qrCodeUrl, email);
          navigate("/2fa-setup", {
            state: {
              twoFA_Url: qrCodeUrl,
              email: email,
            },
          });
        } else if (response.status === 200) {
          const { success, token } = response.data;
          if (success) {
            window.sessionStorage.setItem("token", token);
            navigateToUserPage(success, token);
          }
        }
      })
      .catch((err) => {
        console.log(err);
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

  const navigateToUserPage = (success, token) => {
    // eslint-disable-next-line react/prop-types
    props.loginRes({ isLogged: success, authToken: token });
    navigate("/userpage");
  };
  return (
    <div>
      <Flex
        backgroundColor="blackAlpha.50"
        direction={{ base: "column", lg: "row" }}
        w={{ base: "100%" }}
        h={{ md: "100vh" }}
      >
        <Navbar btnName="Register" path="register" />
        <Feature />
        <LoginForm isSubmit={isSubmitted} />
      </Flex>
    </div>
  );
};

export default Login;
