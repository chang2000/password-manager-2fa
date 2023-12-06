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
      // eslint-disable-next-line react/prop-types
      props.isSubmit(input);
    }
  };
  return (
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
        w={{ base: "90%", md: "60%", xl: "40%" }}
        p={{ base: "3em", md: "3.5em", xl: "4em" }}
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
          <Heading
            align="center"
            fontSize={{ base: "xl", xl: "2xl" }}
            color="blackAlpha.700"
          >
            Register Here
          </Heading>
          <VStack
            spacing={5}
            alignItems="center"
            mt={{ base: "1.5em", md: "1.5em", xl: "2em" }}
          >
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
            <Button
              type="submit"
              colorScheme="messenger"
              mt={{ base: "0.25em", md: "0.5em", xl: "0.75em" }}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
