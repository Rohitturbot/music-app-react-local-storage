import React, { useEffect, useState } from "react";
import Header from "../Header";
import Icon from "../Icon";
import InfoTooltip from "../InfoTooltip";
import LoadingIndicatorRow from "../LoadingIndicatorRow";
import NoResultsRow from "../NoResultsRow";
import ReactPaginate from "react-paginate";
import Search from "../Search";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addIcon } from "../../constants/icon";
import { BASE_URL, LIMIT } from "../../constants/general";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { isEmpty } from "lodash";

const Songs = ({
  albums = [],
  handlePagination,
  loading,
  onAddItem,
  onSearch,
  query,
  searchAction,
  showHeader = true,
  songs,
}) => {
  return (
    <>
      {showHeader && <Header />}
      <Search query={query} onSearch={onSearch} searchAction={searchAction} />
      {loading && <LoadingIndicatorRow />}
      {!loading && isEmpty(songs) && (
        <NoResultsRow message={"No Songs found."} />
      )}
      {!loading && !isEmpty(songs) && (
        <>
          <Row>
            {songs.map((song) => {
              const albumOfSong =
                albums && albums.find((album) => album.id === song.albumId);
              return (
                <Col xs={12} md={3} key={song.id}>
                  <CardGroup className="mb-2">
                    <Card>
                      <Card.Img variant="top" src={`${song.thumbnailUrl}`} />
                      <Card.Body>
                        <Card.Title>{song.title}</Card.Title>
                      </Card.Body>
                      <Card.Footer>
                        <Row>
                          <Col>
                            <small className="text-muted">
                              {albumOfSong ? albumOfSong.title : ""}
                            </small>
                          </Col>
                          {onAddItem && (
                            <Col xs="auto">
                              <InfoTooltip content="Add song to your playlist">
                                <span className="text-link text-right">
                                  <Icon
                                    icon={addIcon}
                                    onClick={() => onAddItem(song)}
                                    fixedWidth={true}
                                  />
                                </span>
                              </InfoTooltip>
                            </Col>
                          )}
                        </Row>
                      </Card.Footer>
                    </Card>
                  </CardGroup>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="text-center" xs="12">
              <ReactPaginate
                containerClassName="d-flex justify-content-evenly react-paginate"
                activeClassName={"text-link"}
                pageCount={500 / songs.length}
                onPageChange={handlePagination}
                marginPagesDisplayed={7}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const SongsWrapper = ({ showHeader, onAddItem, searchLimit = LIMIT }) => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const { setItem, value } = useLocalStorage("album");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}photos?_limit=${LIMIT}`)
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
    let FETCH_URL = `${BASE_URL}photos?q=${query}&&_limit=${searchLimit}`;
    fetch(FETCH_URL)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSongs(data);
      });
  };

  const handlePagination = (pageNumber) => {
    let FETCH_URL = `${BASE_URL}photos?q=${query}&&_limit=${searchLimit}&_page=${
      pageNumber.selected + 1
    }`;
    fetch(FETCH_URL)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      });
  };

  return (
    <Songs
      albums={albums}
      handlePagination={handlePagination}
      loading={loading}
      onAddItem={onAddItem}
      onSearch={onSearch}
      query={query}
      searchAction={searchAction}
      showHeader={showHeader}
      songs={songs}
    />
  );
};

export default SongsWrapper;
