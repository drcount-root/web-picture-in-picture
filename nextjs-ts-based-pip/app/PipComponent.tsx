"use client";
import React from "react";
import { ctxPip } from "../utils/pipWindow";

const videos = [
  {
    id: 1,
    video_src: "/mov_bbb.mp4",
  },
  {
    id: 2,
    video_src: "/vid_2.mp4",
  },
];

const PipComponent = () => {
  let videosAll: any;
  let pipWindow: any;

  if (typeof window !== "undefined") {
    videosAll = document.querySelectorAll(".video_class");
  }

  const enterPip = async () => {
    console.log(videosAll[0]);

    pipWindow = ctxPip();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    videosAll[0].play().then(() => {
      const drawFrame = () => {
        ctx?.drawImage(videosAll[0], 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(videosAll[0]);
      };

      drawFrame();
    });

    pipWindow?.document?.body?.append(canvas);
  };

  return (
    <>
      <div>
        {videos?.map((video: any) => (
          <div key={video.id}>
            <video className="video_class" autoPlay muted loop>
              <source src={video.video_src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      <button onClick={enterPip} className="bg-white text-black mt-6">
        Enter PIP
      </button>
    </>
  );
};

export default PipComponent;
