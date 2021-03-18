import React from "react";
import LoadingIcon from "../LoadingIcon";
import { Col, ListGroup, Row } from "react-bootstrap";

const LoadingIndicatorRow = ({ className = "", rowClassName = "" }) => (
  <ListGroup.Item className={`${className} list-group-item`}>
    <Row className={`flex-nowrap ${rowClassName}`}>
      <Col className="col-auto pr-0">
        <LoadingIcon />
      </Col>
      <Col>
        <span>Loading...</span>
      </Col>
    </Row>
  </ListGroup.Item>
);

export default LoadingIndicatorRow;
