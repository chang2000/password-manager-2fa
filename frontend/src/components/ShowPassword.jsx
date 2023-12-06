import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import PasswordEntry from "./PasswordEntry";

const ShowPassword = () => {
  const [havePasswords, setHavePasswords] = useState(false);
  const [passwords, setPasswords] = useState();
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
      .post('/api/user/getPass', { passkey: passkey })
      .then((response) => {
        setPasswords(response.data.data);
        setHavePasswords(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteEntry = async (id) => {
    axios
      .post('/api/user/delPass', { entryId: id })
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

  return (
    <div>
      <Button onClick={getPasswords} colorScheme={"messenger"}>
        Get Passwords
      </Button>
      {havePasswords && (
        <PasswordEntry passwords={passwords} deleteButton={deleteEntry} />
      )}
    </div>
  );
};

export default ShowPassword;
