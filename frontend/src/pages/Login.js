import LoginForm from "../components/Login/LoginForm";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import Feature from "../components/Login/Feature";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const toast = useToast();
  const navigate = useNavigate();
  const isSubmitted = async (loginVal) => {
    axios
      .post('/api/auth/login', loginVal)
      .then((response) => {
        const { success, token } = response.data;
        if (success) {
          window.sessionStorage.setItem("token", token)
          navigateToUserPage(success,token)
        }
      })
      .catch((err) => {
        console.log(err)
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
    props.loginRes({isLogged:success, authToken:token})
    navigate("/userpage")
  }
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
