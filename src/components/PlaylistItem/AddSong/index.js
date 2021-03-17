import React, { useState } from "react";
import { Accordion, Button, Card, Col, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddPlaylistItem = ({ onAddItem }) => {
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(item);
    setItem(null);
  };

  const handleOnChange = (e) => {
    // {
    //   "albumId": 1,
    //   "id": 32,
    //   "title": "ad enim dignissimos voluptatem similique",
    //   "url": "https://via.placeholder.com/600/c70a4d",
    //   "thumbnailUrl": "https://via.placeholder.com/150/c70a4d"
    // },
    e.preventDefault();
    setItem({
      id: uuidv4(),
      title: e.target.value,
      url: "https://via.placeholder.com/600/c70a4d",
      thumbnailUrl: "https://via.placeholder.com/150/c70a4d",
      albumId: 1,
    });
  };
  return (
    <Accordion className="mt-4">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Create Playlist
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Add playlist item
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Enter playlist name"
                    onChange={handleOnChange}
                    value={item ? item.title.value : ""}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="mb-2">
                    Create
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddPlaylistItem;
