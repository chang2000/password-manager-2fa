/* eslint-disable react/prop-types */
import {
  Button,
  Input,
  InputGroup,
  VStack,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const AddPassword = ({ getPasswords }) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [passInput, setPassInput] = useState({
    website: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassInput((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passkey = window.sessionStorage.getItem("passkey");
    if (!passkey) {
      toast({
        title: "Passkey Not Found",
        description: "Please refresh the page and provide a passkey",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    const addPassInput = { ...passInput, passkey: passkey };

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.sessionStorage.getItem("token")}`;
    axios
      .put("/api/user/savePass", addPassInput)
      .then((response) => {
        const { success, data } = response.data;
        if (success && data) {
          toast({
            title: data,
            status: "success",
            isClosable: true,
          });
          setPassInput({
            website: "",
            username: "",
            email: "",
            password: "",
          });
          getPasswords();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="center" maxW="20em">
        <Input
          onChange={handleChange}
          placeholder="Website"
          name="website"
          required={true}
          value={passInput.website}
        />
        <Input
          onChange={handleChange}
          placeholder="Username"
          name="username"
          value={passInput.username}
        />
        <Input
          onChange={handleChange}
          placeholder="Email Address"
          name="email"
          autoComplete="off"
          value={passInput.email}
        />
        <InputGroup>
          <Input
            onChange={handleChange}
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            required={true}
            value={passInput.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button type="submit" colorScheme="messenger" mt="1.5em">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default AddPassword;
