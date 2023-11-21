import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import DoneIcon from "@mui/icons-material/Done";


const Feature = () => {
  const fontsizes = {base:"xl", md:"2xl", lg:"3xl"}
  return (
    <Box w={{md:"50%"}}>
      <VStack mt={{base:"7em",lg:"60%", xl:"20%"}} alignItems="left" pl={{base:"1.2em", xl:"2em"}} w={{base:"100%"}} >
      
        <Text as="span" color="blackAlpha.700" fontSize={fontsizes}>
          <Icon as={DoneIcon} />
          &nbsp; Save all of your Passwords in one place.
        </Text>
        <Text as="span" color="blackAlpha.700" fontSize={fontsizes}>
          <Icon as={DoneIcon} />
          &nbsp; Keeps Your Passwords Safe.
        </Text>
        <Text as="span" color="blackAlpha.700" fontSize={fontsizes}>
          <Icon as={DoneIcon} />
          &nbsp; Cannot be decrypted without your passkey.
        </Text>
      </VStack>
    </Box>
  );
};

export default Feature;
