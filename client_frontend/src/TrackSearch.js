import React from "react";

export default function TrackSearch({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        alt=""
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
      />
      {/* rendering image and title of our selected track.... */}
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}

// resolving react dependencies conflict... use: ```npm i <package name> --legacy-peer-deps```
//  legacy peer deps to resolve conflicts ...
