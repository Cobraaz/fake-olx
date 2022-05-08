import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { DataContext } from "../../store/GlobalState";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { auth },
  } = useContext(DataContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        Object.values(auth).length < 2 && !(auth.token && auth?.user?.email) ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
