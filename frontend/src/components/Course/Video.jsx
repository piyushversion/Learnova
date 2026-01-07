import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Video = ({src,poster}) => {

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(()=>{

    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      // Initialize the player
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
        sources: [
          {
            src: src,
            type: src.endsWith(".m3u8")
              ? "application/x-mpegURL"
              : "video/mp4",
          },
        ],
        poster: poster || "",
      });
    } else {
      // If source changes, update player
      const player = playerRef.current;
      player.src({
        src: src,
        type: src.endsWith(".m3u8")
          ? "application/x-mpegURL"
          : "video/mp4",
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };

  },[src])

  return (

    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>

  )

}

export default Video