import { useState, useEffect, useRef } from "react";
import { Box, Input, Button, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ChatBox = () => {
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
  const userMessageColor = useColorModeValue("blue.100", "blue.300");
  const botMessageColor = useColorModeValue("gray.200", "gray.500");

  return (
    <Box
      className="Chatbox"
      textAlign="center"
      bg={bgColor}
      minHeight="30vh"
      maxHeight="50vh"
      py={4}
    >
      <Text fontSize="2xl" color="teal.500" p={4}>
        GPT Chatbox
      </Text>
      <Box
        className="chatbox"
        bg="white"
        p={4}
        borderRadius="lg"
        mx="auto"
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box
          className="chatlog"
          bg={bgColor}
          borderRadius="md"
          p={3}
          mb={4}
          overflowY="scroll"
          maxHeight="400px"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              bg={message.sender === "You" ? userMessageColor : botMessageColor}
              p={2}
              borderRadius="md"
              m={1}
            >
              <Text fontSize="md">{message.text}</Text>
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
