"use client";
import React from "react";
import { ctxPip } from "../utils/pipWindow";
import Video from "./Video";

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
    // console.log("check", videosAll);

    pipWindow = ctxPip();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const canvas1 = document.createElement("canvas");
    const ctx1 = canvas1.getContext("2d");
    // canvas.style.display = "flex";
    // canvas.style.flexDirection = "column";

    // videosAll[0].play().then(() => {
    //   const drawFrame = () => {
    //     ctx?.drawImage(videosAll[0], 0, 0, canvas.width, canvas.height);
    //     requestAnimationFrame(drawFrame);
    //   };

    //   drawFrame();
    // });

    // videosAll[1].play().then(() => {
    //   const drawFrame = () => {
    //     ctx1?.drawImage(videosAll[1], 0, 0, canvas1.width, canvas1.height);

    //     requestAnimationFrame(drawFrame);
    //   };

    //   drawFrame();
    // });

    for (let a of [
      { id: 1, video: videosAll[0] },
      { id: 2, video: videosAll[1] },
    ]) {
      console.log("check", a.video);

      a?.video?.play().then(() => {
        let theContext: any;
        let theVideo: any;
        let y: number;
        let z: number;

        if (a?.id === 1 && ctx) {
          theContext = ctx;
          theVideo = videosAll[0];
          y = canvas.width;
          z = canvas.height;
        } else {
          theContext = ctx1;
          theVideo = videosAll[1];
          y = canvas1.width;
          z = canvas1.height;
        }
        const drawFrame = () => {
          theContext?.drawImage(theVideo, 0, 0, y, z);
          requestAnimationFrame(drawFrame);
        };

        drawFrame();
      });
    }

    // videosAll[1].play().then(() => {
    //   const drawFrame = () => {
    //     ctx?.drawImage(
    //       videosAll[1],
    //       0,
    //       canvas.height / 2,
    //       canvas.width,
    //       canvas.height / 2
    //     );

    //     requestAnimationFrame(drawFrame);
    //   };

    //   drawFrame();
    // });

    // for appending in body
    document?.body?.append(canvas);
    document?.body?.append(canvas1);

    // for appending in pipWindow
    pipWindow?.document?.body?.append(canvas);
    pipWindow?.document?.body?.append(canvas1);
  };

  // console.log("check", enterPip);

  return (
    <>
      <div>
        {videos?.map((video: any) => (
          <div key={video.id}>
            <Video video={video} />
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

// ###########################################################################################
