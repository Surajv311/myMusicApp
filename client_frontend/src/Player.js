import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback"; // docs....

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null; // if no access token then return...
  return (
    <SpotifyPlayer
      //   styles={{
      //     // docs
      //     activeColor: "#fff",
      //     bgColor: "#333",
      //     color: "#fff",
      //     loaderColor: "#fff",
      //     sliderColor: "#1cb954",
      //     trackArtistColor: "#ccc",
      //     trackNameColor: "#fff",
      //   }}
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false); // callback every time song changes...
      }}
      play={play}
      uris={trackUri ? [trackUri] : []} // it expects uri / empty array...
    />
  );
}
