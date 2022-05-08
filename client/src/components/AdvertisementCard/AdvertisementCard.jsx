import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
} from "reactstrap";
import { priceWithCommas } from "../../utils/helper.function";

const AdvertisementCard = ({
  advertisement: {
    title,
    image,
    description,
    price,
    _id: advertisementId,
    createdAt,
  },
}) => {
  const history = useHistory();

  return (
    <Col lg="4" md="6" className="mb-5">
      <Card
        style={{ cursor: "pointer" }}
        onClick={() => history.push(`/advertisement/${advertisementId}`)}
      >
        <CardImg alt="Card image cap" src={image} top width="100%" />
        <CardBody>
          <CardTitle className="d-inline-block" tag="h5">
            {title}
          </CardTitle>
          <CardSubtitle
            className="d-inline-block mb-2 text-muted float-end"
            style={{ marginTop: "0.2rem" }}
            tag="h6"
          >
            ₹ {priceWithCommas(price)}
          </CardSubtitle>
          <hr />
          <CardText>{description.split(" ", 12).join(" ")}...</CardText>
          <CardSubtitle
            className="d-inline-block mb-2 text-muted float-end"
            style={{ marginTop: "0.2rem", fontSize: "12px" }}
            tag="h6"
          >
            {new Date(createdAt).toLocaleDateString()}
          </CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AdvertisementCard;
