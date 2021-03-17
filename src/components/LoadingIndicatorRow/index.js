import React from "react";
import LoadingIcon from "../LoadingIcon";
import { Col, ListGroup, Row } from "react-bootstrap";

const LoadingIndicatorRow = ({
  className = "",
  mini = false,
  rowClassName = "",
}) => (
  <ListGroup.Item
    className={`${className} list-group-item text-muter ${mini ? "py-2" : ""}`}
  >
    <Row className={`flex-nowrap ${rowClassName}`}>
      <Col className="col-auto pr-0">
        <LoadingIcon className={mini ? "small" : ""} />
      </Col>
      <Col>
        <span className={mini ? "small" : ""}>Loading...</span>
      </Col>
    </Row>
  </ListGroup.Item>
);

export default LoadingIndicatorRow;
