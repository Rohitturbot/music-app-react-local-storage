import React from "react";
import Playlist from "./components/PlaylistItems";
import Songs from "./components/Songs";
import usePageTitle from "./hooks/usePageTitle";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

const App = () => {
  usePageTitle("Visual BI Music App");
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Tabs id="vbi-music">
            <Tab eventKey="songs" title="Songs">
              <Songs />
            </Tab>
            <Tab eventKey="playlist" title="Playlist">
              <Playlist />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
