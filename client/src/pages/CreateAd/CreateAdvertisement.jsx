import { Col, Row } from "reactstrap";
import CreateADForm from "../../components/CreateADForm/CreateADForm";
import styles from "./createad.module.css";

const CreateAdvertisement = () => {
  return (
    <div className={styles.createAd}>
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs={{ size: 12 }}>
          <div className={styles.formWrapper}>
            <h1>Create Advertisement</h1>
            <CreateADForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAdvertisement;
