import { React, useState, useEffect } from "react";
import Auth from "./Auth";
import TrackSearch from "./TrackSearch";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
import axios from "axios";

const client_id = "585eaa2fa9ec4891a14bff801067f8d8";

const api_search = new SpotifyWebApi(client_id);

export default function Dashboard({ code }) {
  const accessToken = Auth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        console.log(res.data.lyrics);
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    api_search.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancelFlag = false;
    api_search.searchTracks(search).then((res) => {
      if (cancelFlag) return;
      setSearchResults(
        res.body.tracks.items.map((track__) => {
          const smallestAlbumImage = track__.album.images.reduce(
            (smallImage, image) => {
              if (image.height < smallImage.height) return image;
              return smallImage;
            },
            track__.album.images[0]
          );

          return {
            artist: track__.artists[0].name,
            title: track__.name,
            uri: track__.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancelFlag = true);
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearch
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
