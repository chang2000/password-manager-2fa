import { useState, useEffect, useRef } from "react";
import { Box, Input, Button, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ChatBox = ({getPasswords}) => {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Function to scroll to the last message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "You" }];
    setMessages(newMessages);
    setInput("");

    axios
      .post("/api/user/chat", { message: input })
      .then((response) => {
        setMessages([
          ...newMessages,
          { text: response.data.message, sender: "Bot" },
        ]);
        getPasswords();
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        const { success, error } = err.response.data;
        if (!success) {
          toast({
            title: error,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  // Color mode values for light and dark themes
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const userMessageColor = useColorModeValue("gray.200", "gray.500");
  const botMessageColor = useColorModeValue("blue.100", "blue.300");

  return (
    <Box
      className="Chatbox"
      textAlign="center"
      bg={bgColor}
      height="min-content"
      width="100%"
      minWidth="20em"
      mt="9em"
      mr="4em"
      borderRadius="lg"
      boxShadow={"md"}
      display="flex"
      flexDir="column"
    >
      <Text fontSize="lg" fontWeight="600" color="teal.500" p="4">
        GPT Chatbox
      </Text>
      <Box
        className="chatbox"
        bg="white"
        p={4}
        mx="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="65vh"
        width="100%"
        borderBottomStartRadius="lg"
        borderBottomEndRadius="lg"
      >
        <Box
          className="chatlog"
          mb={4}
          overflowY="scroll"
          display="flex"
          flexDirection="column"
          gap={2}
          textAlign="start"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.sender === "You" ? "end" : "start"}
            >
              <Box
                bg={
                  message.sender === "You" ? userMessageColor : botMessageColor
                }
                px={3}
                py={2}
                width="fit-content"
                ml={message.sender === "You" ? 8 : 0}
                mr={message.sender === "You" ? 0 : 8}
                borderRadius="xl"
                borderBottomStartRadius={message.sender === "You" ? "xl" : 0}
                borderBottomEndRadius={message.sender === "You" ? 0 : "xl"}
              >
                <Text fontSize="md">{message.text}</Text>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box className="user-input" display="flex">
          <Input
            flex="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Say something..."
          />
          <Button colorScheme="teal" onClick={sendMessage} ml={2}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
