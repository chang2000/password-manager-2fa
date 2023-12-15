import { Flex } from "@chakra-ui/react";
import PageTab from '../components/PageTab';
import UserNav from "../components/UserNav";
import { useState, useEffect } from "react";
import PasskeyModal from "../components/PasskeyModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InactivityLogout from '../components/InactivityLogout';

const UserPage = () => {
  const navigate = useNavigate();
  const [hasPasskey, setHasPasskey] = useState(false);
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

  useEffect(() => {
    setHasPasskey(window.sessionStorage.getItem("passkey"));
  }, []);

  const passkeyFunc = (passkey) => {
    window.sessionStorage.setItem("passkey", passkey);
    setHasPasskey(true);
  };

  return (
    <div>
      <InactivityLogout />
      <UserNav fName={fName} />
      {!hasPasskey ? (
        <PasskeyModal passkeyFunc={passkeyFunc} passkeyVal={hasPasskey} />
      ) : null}
      <Flex backgroundColor="blackAlpha.50" minHeight={"100vh"} maxHeight={"100%"} justify="center">
        <PageTab hasPasskey={hasPasskey}/>
      </Flex>
    </div>
  );
};

export default UserPage;
