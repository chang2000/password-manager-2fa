import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const isSubmitted = async (userInfo) => {
    axios
      .post('/api/auth/register', userInfo)
      .then((response) => {
        const { success, data } = response.data;
        console.log(response.data)
        if (success) {
          toast({
            title: data,
            status: "success",
            isClosable: true,
          });
          const twoFA_Url = response.data.qrCodeUrl
          // navigate("/2fa-setup");
          navigate("/2fa-setup", { state: { twoFA_Url: twoFA_Url } });

        }
      })
      .catch((err) => {
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

  return (
    <div>
      <Navbar btnName="Login" path="/" />
      <RegisterForm isSubmit={isSubmitted} />
    </div>
  );
};

export default Register;
