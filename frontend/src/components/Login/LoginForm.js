import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  Link
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as Rlink } from "react-router-dom";

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
    <Box w={{base:"100%", lg:"50%"}} align="center">
      <Box
        w={{base:"90%", md:"80%", lg:"90%", xl:"80%"}}
        p={{base:"1.5em", md:"3em", xl:"3.8em"}}
        mt={{base:"5em", lg:"60%", xl:"20%"}}
        borderRadius="20px"
        boxShadow="xl"
        backgroundColor="white"
      >
        <Heading color="gray.500" mb={{base:"1em", md:"3em" }} fontSize={{base:"xl", xl:"2xl"}}>
          Please Login to continue
        </Heading>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              mb={{base:"1em", lg:"20px", xl:"1.8em"}}
              // pr="4.5rem"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              isRequired={true}
              autoComplete="off"
              maxLength={40}
            />
          </InputGroup>
          <InputGroup mb={{base:"1em", lg:"20px", xl:"1.8em"}}>
            <Input
              pr="4.5rem"
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
          <Button type="submit" colorScheme="messenger">
            Login
          </Button>
        </form>
        <Box mt={{base:"1.5em"}}>
        <Link color="blackAlpha.700" as={Rlink} to="/forgotpass"> Forgot Password? </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
