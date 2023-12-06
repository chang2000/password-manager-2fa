import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddPassword from "./AddPassword";
import ShowPassword from "./ShowPassword";

const PageTab = () => {
  return (
    <Tabs
      mt={{ base: "10em" }}
      maxW="55em"
      w="100%"
      mx={{ base: "2em", md: "4em" }}
      align="center"
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
          <AddPassword />
        </TabPanel>
        <TabPanel>
          <ShowPassword />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PageTab;
