import { React, useState, useEffect } from "react";
import Auth from "./Auth";
import TrackSearch from "./TrackSearch";
import { Container, Form } from "react-bootstrap";
import SpotifyApi from "spotify-web-api-node";
import Player from "./Player";
import axios from "axios";

const client_id = "585eaa2fa9ec4891a14bff801067f8d8";

const api_search = new SpotifyApi(client_id);

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
        // so when response received we set the lyrics.....
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return; // if accessToken doesn't exist then return ...else run useEffect...
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
            track__.album.images[0] // taking the smallest pic for image... in res.body... different images...album pic
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

    return () => (cancelFlag = true); // so when we search for a song, to avoid delay for every alphabet we put...
    // put a flag...
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
            {/* if my search is empty then display lyrics... */}
            {/* we have already set useEffect that if we play a song then our search would be empty "" */}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
