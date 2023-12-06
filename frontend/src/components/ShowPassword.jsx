/* eslint-disable react/prop-types */
import { Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import PasswordEntry from "./PasswordEntry";

const ShowPassword = ({ hasPasskey, passwords, getPasswords }) => {
  const toast = useToast();

  const deleteEntry = async (id) => {
    axios
      .post("/api/user/delPass", { entryId: id })
      .then((response) => {
        const { data, success } = response.data;
        if (success && data) {
          toast({
            title: data,
            status: "success",
            isClosable: true,
          });
          getPasswords();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (hasPasskey) {
      getPasswords();
    }
  }, [hasPasskey, getPasswords]);

  return (
    <div>
      {passwords.length !== 0 && (
        <PasswordEntry passwords={passwords} deleteButton={deleteEntry} />
      )}
      {passwords.length === 0 && (
        <Text
          as="span"
          color="blackAlpha.700"
          whiteSpace="nowrap"
        >
          No password currently
        </Text>
      )}
    </div>
  );
};

export default ShowPassword;
