import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CardImg,
  Col,
  Row,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { getData } from "../../utils/fetchData";
import { priceWithCommas } from "../../utils/helper.function";

import styles from "./advertisement.module.css";

const categoryArray = [
  {
    value: "car",
    name: "Car",
  },
  {
    value: "motorcycle",
    name: "Motorcycle",
  },
  {
    value: "house&apartment",
    name: "House & Apartment",
  },
  {
    value: "scooter",
    name: "Scooter",
  },
];

const Advertisement = () => {
  const { advertisementId } = useParams();
  const [advertisement, setAdvertisement] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const res = await getData(
        `advertisement/get-advertisement/${advertisementId}`
      );
      if (res.err) return res.err.map(({ msg }) => toast.error(msg));

      setAdvertisement(res.advertisement);
    };
    fetch();
  }, [advertisementId]);

  if (!(Object.keys(advertisement).length > 0))
    return (
      <div>
        <span className={styles.noAdvertisment}>No Advertisment</span>
      </div>
    );

  const { title, image, description, price, createdAt, category } =
    advertisement;

  const categoryName = categoryArray.find(
    ({ value }) => value === category
  ).name;

  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
          <div>
            <CardImg alt="Advertisement Image" src={image} top width="100%" />
          </div>
        </Col>
        <Col md={6} sm={12}>
          <CardBody>
            <CardTitle className="mt-4" tag="h1">
              {title}
            </CardTitle>
            <CardSubtitle
              className="d-inline-block mt-4 mb-5 text-muted"
              style={{ marginTop: "0.2rem" }}
              tag="h3"
            >
              ₹ {priceWithCommas(price)}
            </CardSubtitle>
            <CardSubtitle
              className="d-inline-block mt-4 mb-5 text-muted float-end"
              style={{ marginTop: "0.2rem" }}
              tag="h4"
            >
              CATEGORY: {categoryName}
            </CardSubtitle>
            <hr />
            <CardText tag="p" className="mt-5">
              {description}
            </CardText>

            <CardSubtitle
              className="d-inline-block mb-2 text-muted float-end"
              style={{ marginTop: "0.2rem" }}
              tag="h6"
            >
              {new Date(createdAt).toLocaleDateString()}
            </CardSubtitle>
          </CardBody>
        </Col>
      </Row>
    </div>
  );
};

export default Advertisement;
