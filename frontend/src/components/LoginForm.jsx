import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ isSubmit }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
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
    isSubmit(input);
  };

  return (
    <Box w={{ base: "100%", lg: "50%" }} justifyContent="center" display="flex">
      <Box
        w={{ base: "90%", md: "80%", lg: "90%", xl: "80%" }}
        p={{ base: "1.5em", md: "3em", xl: "3.8em" }}
        borderRadius="20px"
        boxShadow="xl"
        backgroundColor="white"
      >
        <Heading
          color="blackAlpha.700"
          align="center"
          fontSize={{ base: "xl", xl: "2xl" }}
        >
          Please Login to continue
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack
            spacing={5}
            alignItems="center"
            mt={{ base: "1.5em", md: "1.5em", xl: "2em" }}
          >
            <InputGroup>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
                isRequired={true}
                autoComplete="off"
                maxLength={40}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                isRequired={true}
                maxLength={40}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              colorScheme="messenger"
              mt={{ base: "0.25em", md: "0.5em", xl: "0.75em" }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
