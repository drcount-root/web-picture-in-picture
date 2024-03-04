import React from "react";

const Video = ({video}: any) => {
  return (
    <div>
      <video className="video_class" autoPlay muted loop>
        <source src={video?.video_src} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
