import React, { useEffect, useState } from "react";
import AddPlaylistItem from "./AddSong";
import Header from "../Header";
import Icon from "../Icon";
import InfoTooltip from "../InfoTooltip";
import NoResultsRow from "../NoResultsRow";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  addIcon,
  deleteIconLight,
  musicIcon,
  shuffleIcon,
} from "../../constants/icon";
import { BASE_URL } from "../../constants/general";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

const SongsList = ({ playlistSongs, albums = [], removeItem }) => {
  return (
    <>
      {isEmpty(playlistSongs) && (
        <div className="mt-4">
          <NoResultsRow message={"No songs in this playlist."} />
        </div>
      )}
      {!isEmpty(playlistSongs) && (
        <Row className="mt-4">
          <Col xs={12}>
            <ListGroup>
              <ListGroup.Item className="header">
                <Row>
                  <Col className="col-auto pr-0">
                    <Icon icon={musicIcon} fixedWidth={true} />
                  </Col>
                  <Col>Songs</Col>
                </Row>
              </ListGroup.Item>
              {playlistSongs.map((song) => {
                const albumOfSong = albums.find(
                  (album) => album.id === song.albumId
                );
                return (
                  <ListGroup.Item key={song.id}>
                    <Row>
                      <Col>{song.title}</Col>
                      <Col xs="auto text-muted">
                        <InfoTooltip content="name of album">
                          {albumOfSong ? albumOfSong.title : ""}
                        </InfoTooltip>
                      </Col>
                      <Col xs="auto">
                        <InfoTooltip content="delete song from playlist">
                          <Icon
                            icon={deleteIconLight}
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(song);
                            }}
                            className="text-link"
                          />
                        </InfoTooltip>
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

const PlaylistItemWrapper = () => {
  const { id } = useParams();
  const [playListSongs, setPlayListSongs] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentPlayList, setCurrentPlaylist] = useState("");
  const [allMyPlayLists, setAllMyPlayLists] = useState([]);
  const { setItem, value } = useLocalStorage("playlist");

  useEffect(() => {
    const allPlayLists = JSON.parse(localStorage.getItem("playlist"));

    const myPlayList = allPlayLists.find((playlist) => playlist.id === id);
    setAllMyPlayLists(allPlayLists);
    setPlayListSongs(myPlayList.songs);
    setCurrentPlaylist(myPlayList);
  }, [id]);

  useEffect(() => {
    const cachedAlbum = JSON.parse(localStorage.getItem("album"));
    if (cachedAlbum) {
      setAlbums(cachedAlbum);
    } else {
      fetch(`${BASE_URL}albums`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          setAlbums(data);
        })
        .catch((e) => console.log(e));
    }
  }, [setItem]);

  const addItem = (item) => {
    // assuming no duplicates for demo purposes
    const a = [...playListSongs, item];
    setPlayListSongs(a);
    currentPlayList.songs.push(item);
    setItem(allMyPlayLists);
  };

  const removeItem = (itemToBeDeleted) => {
    const remainingSongs = playListSongs.filter(
      (item) => itemToBeDeleted.id !== item.id
    );
    setPlayListSongs(remainingSongs);
    currentPlayList.songs = remainingSongs.slice(0);
    setItem(allMyPlayLists);
  };

  const shuffle = (songs) => {
    const a = songs.sort(() => Math.random() - 0.5);
    setPlayListSongs(a);
    currentPlayList.songs = a.slice(0);
    setItem(allMyPlayLists);
    setShuffled(!shuffled);
  };

  return (
    <>
      <Row>
        <Col className="mt-4">
          <Header
            headerTitle={`Playlist ${
              currentPlayList ? currentPlayList.name : ""
            }`}
            alignment="left"
          />
          <div className="text-right">
            <Button variant="success" onClick={() => setOpenAdd(!openAdd)}>
              <Icon icon={addIcon} className="mr-2" />
              Add
            </Button>{" "}
            <Button variant="warning" onClick={() => shuffle(playListSongs)}>
              <Icon icon={shuffleIcon} className="mr-2" />
              Shuffle songs
            </Button>
          </div>
          <SongsList
            playlistSongs={playListSongs}
            albums={albums}
            removeItem={removeItem}
          />
        </Col>
      </Row>
      {openAdd && (
        <Row>
          <Col>
            <AddPlaylistItem onAddItem={addItem} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlaylistItemWrapper;
