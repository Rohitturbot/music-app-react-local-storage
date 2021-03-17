import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import Icon from "../Icon";
import { emptyIconLight } from "../../constants/icon";

const NoResultsRow = ({ message = "None.", rowClassName = "" }) => (
  <ListGroup.Item className="list-group-item text-muter">
    <Row className={`flex-nowrap ${rowClassName}`}>
      <Col className="col-auto pr-0">
        <Icon icon={emptyIconLight} fixedWidth={true} />
      </Col>
      <Col>{message}</Col>
    </Row>
  </ListGroup.Item>
);

export default NoResultsRow;
