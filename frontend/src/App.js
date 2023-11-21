import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "./Route/PrivateRouter";
import UserPage from "./pages/UserPage";

function App() {
  const [loginResponse, setLoginResponse] = useState({
    isLogged: false,
    authToken: "",
  });
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
            <Login
              loginRes={(responseObject) => setLoginResponse(responseObject)}
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgotpass" element={<ForgotPass />} />
        <Route exact path="/resetpass/:resetToken" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
