import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row } from "reactstrap";
import SignInForm from "../../components/SignInForm/SignInForm";
import { DataContext } from "../../store/GlobalState";

import styles from "./signin.module.css";

const SignIn = () => {
  const {
    state: { auth },
  } = useContext(DataContext);

  if (auth.token && auth.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.signIn}>
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs={{ size: 12 }}>
          <div className={styles.formWrapper}>
            <h1>SignIn</h1>
            <SignInForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
