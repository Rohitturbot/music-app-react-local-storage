import React from "react";
import SongsWrapper from "../../Songs";
import { Accordion, Card } from "react-bootstrap";

const AddPlaylistItem = ({ onAddItem }) => {
  return (
    <Accordion className="mt-4" defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Add songs to playlist
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <SongsWrapper
              showHeader={false}
              onAddItem={onAddItem}
              searchLimit={8}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddPlaylistItem;
