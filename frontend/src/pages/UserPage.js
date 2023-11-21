import { Flex } from "@chakra-ui/react";
import PageTab from "../components/userPage/PageTab";
import UserNav from "../components/userPage/UserNav";
import { useState, useEffect } from "react";
import PasskeyModal from "../components/userPage/PasskeyModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [isPasskey, setIsPasskey] = useState(false);
  const [fName, setFname] = useState("");
  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.sessionStorage.getItem("token")}`;
    axios
      .get('/api/user/userPage')
      .then((response) => {
        if (response.data.data) {
          setFname(response.data.data.fName);
        }
      })
      .catch((err) => {
        const { error, success } = err.response.data;
        if (!success && error === "Not Authorized to access this route") {
          window.sessionStorage.clear();
          navigate("/");
        }
      });
  }, []);


  const passkeyFunc = (passkey) => {
    window.sessionStorage.setItem("passkey", passkey);
    setIsPasskey(true);
  };

  return (
    <div>
      <UserNav fName={fName} />
      {!isPasskey ? (
        <PasskeyModal passkeyFunc={passkeyFunc} passkeyVal={isPasskey} />
      ) : null}
      <Flex backgroundColor="blackAlpha.50" minHeight={"100vh"} maxHeight={"100%"} justify="center" pb={"3em"}>
        <PageTab />
      </Flex>
    </div>
  );
};

export default UserPage;
