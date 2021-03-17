import React, { useEffect, useState } from "react";
import AddPlaylistItem from "./AddPlaylistItem";
import Icon from "../Icon";
import Header from "../Header";
import NoResultsRow from "../NoResultsRow";
import moment from "moment";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Col, ListGroup, Row } from "react-bootstrap";
import { deleteIconLight } from "../../constants/icon";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

const PlaylistItems = ({ playlistItems, removeItem }) => {
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
                return (
                  <ListGroup.Item key={playlistItem.id}>
                    <Link
                      to={`/playlist/${playlistItem.id}`}
                      className="text-decoration-none"
                    >
                      <Row>
                        <Col>{playlistItem.name}</Col>
                        <Col xs="auto">
                          Created at:{" "}
                          {moment(playlistItem.createdAt, "x").format(
                            "DD MMM YYYY hh:mm a"
                          )}
                        </Col>
                        <Col xs="auto">
                          <Icon
                            icon={deleteIconLight}
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(playlistItem);
                            }}
                          />
                        </Col>
                      </Row>
                    </Link>
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
    const remainingPlaylists = playlistItems.filter(
      (item) => itemToBeDeleted.id !== item.id
    );
    setPlaylistItems(remainingPlaylists);
    setItem(remainingPlaylists);
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
