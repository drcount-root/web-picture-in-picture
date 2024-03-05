const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.display = "flex";
canvas.style.flexDirection = "column";
canvas.width=300;
canvas.height=500;

const mainVideos = document.querySelectorAll(".main_video");

const enterPip = async () => {
  const pipWindow = await documentPictureInPicture.requestWindow();
  mainVideos[0].play().then(() => {
    const drawFrame = () => {
      ctx.drawImage(mainVideos[0], 0, canvas.height/2, canvas.width, canvas.height/2);
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  });

  mainVideos[1].play().then(() => {
    const drawFrame = () => {
      ctx.drawImage(
        mainVideos[1],
        canvas.width / 2,
        0,
        canvas.width / 2,
        canvas.height
      );
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  });

  document?.body?.append(canvas);

  pipWindow?.document?.body?.append(canvas);
};