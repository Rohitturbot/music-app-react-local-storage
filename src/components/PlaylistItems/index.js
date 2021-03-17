import React, { useEffect, useState } from "react";
import Header from "../Header";
import NoResultsRow from "../NoResultsRow";
import { Col, ListGroup, Row } from "react-bootstrap";
import { isEmpty } from "lodash";
import useLocalStorage from "../../hooks/useLocalStorage";
import AddPlaylistItem from "./AddPlaylistItem";
import moment from "moment";

const PlaylistItems = ({ playlistItems }) => {
  return (
    <>
      <Header headerTitle="Playlists" />
      {isEmpty(playlistItems) && (
        <NoResultsRow message={"No playlist created."} />
      )}
      {!isEmpty(playlistItems) && (
        <Row>
          <Col xs={12}>
            <ListGroup>
              {playlistItems.map((playlistItem) => {
                console.log("playlistItem", playlistItem);
                return (
                  <ListGroup.Item key={playlistItem.id}>
                    <Row>
                      <Col>{playlistItem.name}</Col>
                      <Col xs="auto">
                        Created at:{" "}
                        {moment(playlistItem.createdAt, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

const PlaylistItemsWrapper = () => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const { setItem, value } = useLocalStorage("playlist");

  const addItem = (item) => {
    // assuming no duplicates for demo purposes
    const a = [...playlistItems, item];
    setPlaylistItems(a);
    setItem(a);
  };

  const removeItem = (itemToBeDeleted) => {
    setPlaylistItems(playlistItems.filter((item) => itemToBeDeleted !== item));
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("playlist"));
    if (items) {
      setPlaylistItems(items);
    } else {
      setItem(items);
    }
  }, [setItem]);

  return (
    <>
      <PlaylistItems playlistItems={playlistItems} removeItem={removeItem} />
      <AddPlaylistItem onAddItem={addItem} />
    </>
  );
};

export default PlaylistItemsWrapper;
