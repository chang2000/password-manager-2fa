import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const RegisterForm = (props) => {
  const toast = useToast();

  const [input, setInput] = useState({
    fName: "",
    lName: "",
    email: "",
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
  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.password !== input.confirmPassword) {
      toast({
        title: "Passwords doesn't Match",
        description: "Please Enter your Passwords again",
        status: "warning",
        isClosable: true,
      });

      return setInput((prevVal) => {
        return {
          ...prevVal,
          password: "",
          confirmPassword: "",
        };
      });
    } else {
      props.isSubmit(input);
    }
  };
  return (
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
        <form onSubmit={handleSubmit}>
          <Heading
            align="center"
            fontSize={{ xl: "2xl" }}
            color="blackAlpha.700"
            p={{ base: "1.1em" }}
          >
            Register Here
          </Heading>
          <VStack spacing={5} alignItems="center" mt={{ xl: "3em" }}>
            <Input
              placeholder="First Name"
              name="fName"
              onChange={handleChange}
              type="text"
              required={true}
              maxLength={30}
              value={input.fName}
            />
            <Input
              placeholder="Last Name"
              name="lName"
              onChange={handleChange}
              type="text"
              required={true}
              maxLength={30}
              value={input.lName}
            />
            <Input
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              type="email"
              required={true}
              maxLength={40}
              autoComplete="off"
              value={input.email}
            />
            <Input
              placeholder="Password"
              name="password"
              onChange={handleChange}
              type="password"
              required={true}
              minLength={8}
              maxLength={40}
              value={input.password}
            />
            <Input
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              required={true}
              minLength={8}
              maxLength={40}
              value={input.confirmPassword}
            />
            <Button type="submit" colorScheme="messenger">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
