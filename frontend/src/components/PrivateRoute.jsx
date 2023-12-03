import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {


  // eslint-disable-next-line react/prop-types
  console.log('private', props.loginResponse)
  // eslint-disable-next-line react/prop-types
  const { isLogged, authToken } = props.loginResponse;
  if (authToken && isLogged) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
