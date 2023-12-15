/* eslint-disable react/prop-types */
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import AddPassword from "./AddPassword";
import ShowPassword from "./ShowPassword";
import ChatBox from "./ChatBox";

const PageTab = ({ hasPasskey }) => {
  const [passwords, setPasswords] = useState([]);
  const toast = useToast();

  const getPasswords = async () => {
    const passkey = window.sessionStorage.getItem("passkey");
    if (!passkey) {
      toast({
        title: "Passkey Not Found",
        description: "Please Refresh the Page and Provide a Passkey",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.sessionStorage.getItem("token")}`;
    axios
      .post("/api/user/getPass", { passkey: passkey })
      .then((response) => {
        setPasswords(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Flex direction="row" w="100%">
      <Flex
        flex={3}
        direction="column"
        mt={{ base: "9em" }}
        maxW="55em"
        mx={{ base: "1em", lg: "3em" }}
      >
        <Tabs
          isFitted
          variant="solid-rounded"
          colorScheme="blackAlpha"
          display="flex"
          flexDirection="column"
          alignItems="center"
          flex={1}
          maxHeight="calc(100vh - 10em)"
        >
          <TabList mb="1em" maxW="20em">
            <Tab whiteSpace="nowrap">Add Password</Tab>
            <Tab whiteSpace="nowrap">Show Passwords</Tab>
          </TabList>
          <TabPanels flex={1} overflow="scroll">
            <TabPanel>
              <AddPassword getPasswords={getPasswords} />
            </TabPanel>
            <TabPanel>
              <ShowPassword
                hasPasskey={hasPasskey}
                passwords={passwords}
                getPasswords={getPasswords}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Flex flex={2}>
        <ChatBox getPasswords={getPasswords} />
      </Flex>
    </Flex>
  );
};

export default PageTab;
