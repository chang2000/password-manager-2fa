/* eslint-disable react/prop-types */
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Text, Box, SimpleGrid, Icon, VStack, Button } from "@chakra-ui/react";

const PasswordEntry = (props) => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={10}
    >
      {props.passwords.map((password) => {
        return (
          <Box
            key={password._id}
            backgroundColor="white"
            borderRadius={"1em"}
            boxShadow={"md"}
            textAlign="left"
            p="2em"
          >
            <VStack alignItems={"left"} display="flex" direction={"column"}>
              <Text>
                <Text as={"span"} color="blackAlpha.700">
                  Website:&nbsp;
                </Text>
                {password.website}
              </Text>
              <Text>
                <Text as={"span"} color="blackAlpha.700">
                  Username:&nbsp;
                </Text>
                {password.username}
              </Text>
              <Text>
                <Text as={"span"} color="blackAlpha.700">
                  Email:&nbsp;
                </Text>
                {password.email}
              </Text>
              <Text>
                <Text as={"span"} color="blackAlpha.700">
                  Password:&nbsp;
                </Text>
                {password.password}
              </Text>
              <Button
                onClick={() => {
                  props.deleteButton(password._id);
                }}
                mt="0.5em"
              >
                <Icon as={DeleteOutlineIcon} />
              </Button>
            </VStack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default PasswordEntry;
