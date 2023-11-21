import {
  Button,
  Flex,
  Input,
  Box,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const url = window.location.href;
  const resetToken = url.split("/").pop();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_RESET_API}/${resetToken}`;

    if (input.password !== input.confirmPassword) {
      toast({
        title: "Passwords doesn't Match",
        description: "Please Enter your Passwords again",
        status: "warning",
        isClosable: true,
      });

      return setInput({
        password: "",
        confirmPassword: "",
      });
    } else {
      axios
        .put(url, { password: input.password })
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
            navigate("/forgotpass");
            toast({
              title: error,
              status: "error",
              isClosable: true,
            });
          }
        });
    }
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
        <Box
          w={{ base: "90%", md: "70%", xl: "40%" }}
          mt={{ base: "12em", xl: "20em" }}
          backgroundColor="white"
          boxShadow="lg"
          borderRadius="20px"
          p={{ base: "2em" }}
        >
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Heading fontSize="xl" color="blackAlpha.700">
                Reset Password
              </Heading>
              <Input
                onChange={handleChange}
                placeholder="Password"
                name="password"
                type="password"
              />
              <Input
                onChange={handleChange}
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Button type="submit" colorScheme="messenger">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default ResetPass;
