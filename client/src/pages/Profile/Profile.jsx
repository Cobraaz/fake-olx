import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ProfileForm from "../../components/Profile/ProfileForm";
import { DataContext } from "../../store/GlobalState";
import styles from "./profile.module.css";

const Profile = () => {
  const {
    state: { auth },
  } = useContext(DataContext);

  if (Object.values(auth).length < 2 && !(auth.token && auth?.user?.email)) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.profile}>
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs={{ size: 12 }}>
          <div className={styles.formWrapper}>
            <h1>Profile</h1>
            <ProfileForm user={auth.user} token={auth.token} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
