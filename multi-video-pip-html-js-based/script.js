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

  function combineCanvasesWithBlending(canvas1, canvas2) {
    // Create a new canvas element
    var combinedCanvas = document.createElement("canvas");
    var context = combinedCanvas.getContext("2d");

    context?.drawImage(canvas1, 0, 0);
    // context?.drawImage(canvas1, 0, 0);
    return combinedCanvas;
  }

  const toRenderInPipWondow = combineCanvasesWithBlending(canvas, canvas1);

  // document?.body?.append(canvas);
  // document?.body?.append(canvas1);

  console.log("toRenderInPipWondow", toRenderInPipWondow);

  document?.body?.append(toRenderInPipWondow);

  pipWindow?.document?.body?.append(toRenderInPipWondow);

  // pipWindow?.document?.body?.append(canvas);
  // pipWindow?.document?.body?.append(canvas1);
};
