import { Box, VStack, Text, Icon, HStack } from "@chakra-ui/react";
import DoneIcon from "@mui/icons-material/Done";

const Feature = () => {
  const fontsizes = { base: "md", md: "xl", lg: "2xl" };

  return (
    <Box w={{ md: "50%" }}>
      <VStack
        alignItems="left"
        pl={{ base: "0", lg: "2em", xl: "4em" }}
        w={{ base: "100%" }}
        justifyContent="center"
      >
        <HStack>
          <Icon as={DoneIcon} />
          <Text
            as="span"
            color="blackAlpha.700"
            fontSize={fontsizes}
            whiteSpace="nowrap"
          >
            Save all of your Passwords in one place.
          </Text>
        </HStack>
        <HStack>
          <Icon as={DoneIcon} />
          <Text
            as="span"
            color="blackAlpha.700"
            fontSize={fontsizes}
            whiteSpace="nowrap"
          >
            Keeps Your Passwords Safe.
          </Text>
        </HStack>
        <HStack>
          <Icon as={DoneIcon} />
          <Text
            as="span"
            color="blackAlpha.700"
            fontSize={fontsizes}
            whiteSpace="nowrap"
          >
            Cannot be decrypted without your passkey.
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Feature;
