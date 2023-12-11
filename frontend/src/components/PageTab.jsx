/* eslint-disable react/prop-types */
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  Flex
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
    <Flex
      direction="row"
      w="100%"
    >
      <Flex
        flex={1}
        direction="column"
        mt={{ base: "10em" }}
        maxW="55em"
        mx={{ base: "2em", md: "4em" }}
      >
        <Tabs
          isFitted
          variant="solid-rounded"
          colorScheme="blackAlpha"
        >
          <TabList mb="1em" maxW="20em">
            <Tab>Add Password</Tab>
            <Tab>Show Passwords</Tab>
          </TabList>
          <TabPanels>
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
      <Flex flex={1}>
        <ChatBox />
      </Flex>
    </Flex>
  );
};



export default PageTab;
