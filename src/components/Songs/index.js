import React, { useEffect, useState } from "react";
import Header from "../Header";
import LoadingIndicatorRow from "../LoadingIndicatorRow";
import NoResultsRow from "../NoResultsRow";
import Search from "../Search";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { isEmpty } from "lodash";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const Songs = ({
  albums = [],
  loading,
  onSearch,
  query,
  searchAction,
  songs,
}) => {
  return (
    <>
      <Header />
      <Search query={query} onSearch={onSearch} searchAction={searchAction} />
      {loading && <LoadingIndicatorRow />}
      {!loading && isEmpty(songs) && (
        <NoResultsRow message={"No Songs found."} />
      )}
      {!loading && !isEmpty(songs) && (
        <Row>
          {songs.map((song) => {
            const albumOfSong = albums.find(
              (album) => album.id === song.albumId
            );
            return (
              <Col xs={12} md={3} key={song.id}>
                <CardGroup className="mb-2">
                  <Card>
                    <Card.Img variant="top" src={`${song.thumbnailUrl}`} />
                    <Card.Body>
                      <Card.Title>{song.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {albumOfSong ? albumOfSong.title : ""}
                      </small>
                    </Card.Footer>
                  </Card>
                </CardGroup>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

const SongsWrapper = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const { setItem, value } = useLocalStorage("album");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}photos?_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSongs(data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const cachedAlbum = JSON.parse(localStorage.getItem("album"));
    if (cachedAlbum) {
      setAlbums(cachedAlbum);
    } else {
      setLoading(true);
      fetch(`${BASE_URL}albums`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setItem(data);
          setAlbums(data);
        })
        .catch((e) => console.log(e));
    }
  }, [setItem]);

  const onSearch = (value) => {
    setQuery(value);
  };

  const searchAction = () => {
    setLoading(true);
    let FETCH_URL = `${BASE_URL}photos?q=${query}&&_limit=10`;
    fetch(FETCH_URL)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSongs(data);
      });
  };

  return (
    <Songs
      songs={songs}
      albums={albums}
      loading={loading}
      query={query}
      onSearch={onSearch}
      searchAction={searchAction}
    />
  );
};

export default SongsWrapper;
