import { useEffect, useContext } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

import styles from "./app.module.css";
import { toast, ToastContainer } from "react-toastify";
import { getData } from "./utils/fetchData";
import { DataContext } from "./store/GlobalState";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/Routing/PrivateRoutes";
import CreateAdvertisement from "./pages/CreateAd/CreateAdvertisement";
import Advertisement from "./pages/Advertisement/Advertisement";
import CustomerHome from "./pages/CustomerHome/CustomerHome";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { dispatch } = useContext(DataContext);
  const getTokenFromLS = localStorage.getItem("OLX_TOKEN");

  useEffect(() => {
    const fetch = async () => {
      const res = await getData("auth/me", getTokenFromLS);
      if (res.err) {
        return res.err.map(({ msg }) => toast.error(msg));
      }

      localStorage.setItem("OLX_TOKEN", res.token);

      dispatch({
        type: "AUTH",
        payload: {
          token: res.token,
          user: res.user,
        },
      });
    };

    if (getTokenFromLS) {
      fetch();
    }
  }, [getTokenFromLS, dispatch]);

  return (
    <>
      <Router>
        <div className={styles.allButFooter}>
          <Header />
          <ToastContainer />
          <Container className={styles.marginTop}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/advertisement/:advertisementId"
                component={Advertisement}
              />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/create-ad"
                component={CreateAdvertisement}
              />
              <PrivateRoute
                exact
                path="/customer-home"
                component={CustomerHome}
              />
            </Switch>
          </Container>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
