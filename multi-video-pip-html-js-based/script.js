const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
// canvas.style.display = "flex";
// canvas.style.flexDirection = "column";
const canvas1 = document.createElement("canvas");
const ctx1 = canvas1.getContext("2d");

const mainVideos = document.querySelectorAll(".main_video");

const ctxPip = async () => {
  const pipWindow = await documentPictureInPicture?.requestWindow();
  return pipWindow;
};

const enterPip = async () => {
  const pipWindow = ctxPip();

  // video 1
  mainVideos[0].play().then(() => {
    const drawFrame1 = () => {
      ctx.drawImage(mainVideos[0], 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame1);
    };

    drawFrame1();
  });

  // video 2
  mainVideos[1].play().then(() => {
    const drawFrame2 = () => {
      ctx1.drawImage(mainVideos[1], 0, 0, canvas1.width, canvas1.height);
      requestAnimationFrame(drawFrame2);
    };

    drawFrame2();
  });

  document?.body?.append(canvas);
  document?.body?.append(canvas1);

  pipWindow?.document?.body?.append(canvas);
  pipWindow?.document?.body?.append(canvas1);
};
