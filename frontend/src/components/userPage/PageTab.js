import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddPassword from "./AddPassword";
import ShowPassword from "./ShowPassword";
const PageTab = () => {
  return (
    <Tabs
      mt={{ base: "5em" }}
      w={{base:"95%", sm:"90%", md:"80%", lg:"70%", xl:"60%"}}
      align="center"
      isFitted
      variant="solid-rounded"
      colorScheme="blackAlpha"
    >
      <TabList mb="1em">
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
