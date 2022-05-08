import { useContext } from "react";
import { Redirect } from "react-router-dom";

import { Col, Row } from "reactstrap";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { DataContext } from "../../store/GlobalState";

import styles from "./signup.module.css";

const SignUp = () => {
  const {
    state: { auth },
  } = useContext(DataContext);

  if (auth.token && auth.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.signUp}>
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs={{ size: 12 }}>
          <div className={styles.formWrapper}>
            <h1>SignUp</h1>
            <SignUpForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
