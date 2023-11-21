import {
  Flex,
  Input,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPass = () => {
  const toast = useToast();
  const url = process.env.REACT_APP_FORGOT_API;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(url, { email: email })
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          navigate("/");
          toast({
            title: data,
            status: "success",
            isClosable: true,
          });
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
          setEmail("");
        }
      });
  };

  return (
    <div>
      <Navbar btnName="Login" path="/" />
      <Flex
        h="100vh"
        backgroundColor="blackAlpha.50"
        align="center"
        direction="column"
      >
        <Flex
          w={{ base: "80%", md: "70%", xl: "40%" }}
          mt={{ base: "10em", xl: "20em" }}
          backgroundColor="white"
          boxShadow="lg"
          borderRadius="20px"
          p={{ base: "2em" }}
          direction="column"
        >
          <Heading
            alignSelf="center"
            fontSize={{ base: "lg", xl: "xl" }}
            color="blackAlpha.700"
            mx={{ base: "auto", xl: "2em" }}
            mb={{ base: "1em", xl: "2em" }}
          >
            Forgot Your Password? Don't Worry it Happens
          </Heading>
          <Heading
            alignSelf="center"
            fontSize={{ base: "xs", xl: "lg" }}
            color="blackAlpha.700"
            mb={{ base: "1.6em", xl: "1em" }}
          >
            Please Enter your Email Address
          </Heading>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
              name="email"
              w={{ base: "100%", xl: "100%" }}
              isRequired={true}
              minLength={8}
              maxLength={40}
              value={email}
            />
            <Flex align="center" direction="column">
              <Button
                type="submit"
                colorScheme="messenger"
                mt={{ base: "2em", xl: "2em" }}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </div>
  );
};

export default ForgotPass;
