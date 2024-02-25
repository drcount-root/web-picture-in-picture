const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const mainVideo = document.querySelector(".main_video");

const enterPip = async () => {
  const pipWindow = await documentPictureInPicture.requestWindow();
  mainVideo.play().then(() => {
    const drawFrame = () => {
      ctx.drawImage(mainVideo, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  });

  pipWindow.document.body.append(canvas);
};
