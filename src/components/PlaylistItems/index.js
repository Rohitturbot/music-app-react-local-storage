import React, { useEffect, useState } from "react";
import AddPlaylistItem from "./AddPlaylistItem";
import Header from "../Header";
import Icon from "../Icon";
import InfoTooltip from "../InfoTooltip";
import moment from "moment";
import NoResultsRow from "../NoResultsRow";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Col, ListGroup, Row } from "react-bootstrap";
import { deleteIconLight, playlistIcon } from "../../constants/icon";
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
              <ListGroup.Item className="header">
                <Row>
                  <Col className="col-auto pr-0">
                    <Icon icon={playlistIcon} fixedWidth={true} />
                  </Col>
                  <Col>Your playlist</Col>
                </Row>
              </ListGroup.Item>
              {playlistItems.map((playlistItem) => {
                return (
                  <ListGroup.Item key={playlistItem.id}>
                    <Link
                      to={`/playlist/${playlistItem.id}`}
                      className="text-decoration-none"
                    >
                      <Row>
                        <Col>{playlistItem.name}</Col>
                        <Col xs="auto text-muted">
                          Created at:{" "}
                          {moment(playlistItem.createdAt, "x").format(
                            "DD MMM YYYY hh:mm a"
                          )}
                        </Col>
                        <Col xs="auto">
                          <InfoTooltip content="delete playlist">
                            <Icon
                              icon={deleteIconLight}
                              onClick={(e) => {
                                e.preventDefault();
                                removeItem(playlistItem);
                              }}
                            />
                          </InfoTooltip>
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
