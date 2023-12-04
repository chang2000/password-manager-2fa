import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import UserPage from "./pages/UserPage";
import TwoFASetup from "./pages/2FASetup";
import TwoFAVerify from "./pages/2FAVerify";
function App() {
  const [loginResponse, setLoginResponse] = useState({
    authToken: sessionStorage.getItem("token"),
    isLogged: sessionStorage.getItem("token") ? true : false,
  });

  useEffect(() => {
    // Check if there's a token in sessionStorage
    const token = sessionStorage.getItem("token");
    if (token) {
      // If token exists, set user as logged in
      setLoginResponse({
        isLogged: true,
        authToken: token,
      });
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute loginResponse={loginResponse} />}>
          <Route exact path="/userpage" element={<UserPage />} />
        </Route>
        <Route
          exact
          path="/"
          element={
            <Login/>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/2fa-setup"
          element={
            <TwoFASetup
              loginRes={(responseObject) => {
                setLoginResponse(responseObject);
              }}
            />
          }
        />

        <Route
          exact
          path="/2fa-verify"
          element={
            <TwoFAVerify
              loginRes={(responseObject) => {
                setLoginResponse(responseObject);
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
