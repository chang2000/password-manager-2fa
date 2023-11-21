import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

const PasskeyModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const passkey = window.sessionStorage.getItem("passkey");
    if (props.passkeyVal === false && !passkey) {
      onOpen();
    }
  }, []);

  const [passkey, setPasskey] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    props.passkeyFunc(passkey);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Passkey</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Text>
                Please Enter A Passkey, that would be used to encrypt your
                passwords (Keep the Passkey same accross every session to avoid
                loss of data)
              </Text>
              <Input
                placeholder="Passkey"
                name="passkey"
                onChange={(e) => setPasskey(e.target.value)}
                required={true}
                maxLength={20}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PasskeyModal;
