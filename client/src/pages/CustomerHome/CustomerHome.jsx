import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { getData } from "../../utils/fetchData";
import { toast } from "react-toastify";
import AdvertisementCard from "../../components/AdvertisementCard/AdvertisementCard";

import styles from "./customerhome.module.css";

const CustomerHome = () => {
  const [advertisements, setAdvertisements] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getData("advertisement/get-advertisements/user");
      if (res.err) return res.err.map(({ msg }) => toast.error(msg));

      setAdvertisements(res.advertisements);
    };
    fetch();
  }, []);

  return (
    <>
      <Row className="mt-3 mb-5">
        <span className={styles.text}>Customer Home</span>
      </Row>
      <Row className="mt-3 mb-5">
        {advertisements.length ? (
          advertisements.map((advertisement) => (
            <AdvertisementCard
              advertisement={advertisement}
              key={advertisement._id}
            />
          ))
        ) : (
          <span className={styles.noAdvertisment}>No Advertisment</span>
        )}
      </Row>
    </>
  );
};

export default CustomerHome;
