// const canvas = document.createElement("canvas");
// const ctx = canvas.getContext("2d");
// canvas.style.display = "flex";
// canvas.style.flexDirection = "column";

// const mainVideos = document.querySelectorAll(".main_video");

// const enterPip = async () => {

//   // video 1
//   mainVideos[0].play().then(() => {
//     const drawFrame = () => {
//       ctx.drawImage(mainVideos[0], 0, 0, canvas.width, canvas.height);
//       requestAnimationFrame(drawFrame);
//     };

//     drawFrame();
//   });

//   // video 2
//   mainVideos[1].play().then(() => {
//     const drawFrame = () => {
//       ctx.drawImage(mainVideos[1], 0, 0, canvas.width, canvas.height);
//       requestAnimationFrame(drawFrame);
//     };

//     drawFrame();
//   });

//   document.body.append(canvas);
// };

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.display = "flex";
canvas.style.flexDirection = "column";

const mainVideos = document.querySelectorAll(".main_video");

const enterPip = async () => {

  // video 1
  mainVideos[0].play().then(() => {
    const drawFrame1 = () => {
      ctx.drawImage(mainVideos[0], 0, 0, canvas.width / 2, canvas.height);
      requestAnimationFrame(drawFrame1);
    };

    drawFrame1();
  });

  // video 2
  mainVideos[1].play().then(() => {
    const drawFrame2 = () => {
      ctx.drawImage(mainVideos[1], canvas.width / 2, 0, canvas.width / 2, canvas.height);
      requestAnimationFrame(drawFrame2);
    };

    drawFrame2();
  });

  document.body.append(canvas);
};