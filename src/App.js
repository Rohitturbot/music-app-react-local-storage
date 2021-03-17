import React from "react";
import Songs from "./components/Songs";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

const App = () => {
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Tabs id="vbi-music">
            <Tab eventKey="home" title="Home">
              <Songs />
            </Tab>
            <Tab eventKey="profile" title="Profile">
              {/* <Sonnet /> */}
              asdfdsffsd
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
