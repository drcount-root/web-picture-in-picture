const pipButton = document.querySelector('button');

pipButton.addEventListener('click', async () => {
  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Add any style sheet that will be needed in the Picture-in-Picture window.
  const commonLink = document.createElement('link');
  commonLink.rel = 'stylesheet';
  commonLink.href = '/common.css';
  pipWindow.document.head.appendChild(commonLink);

  const pipWindowLink = document.createElement('link');
  pipWindowLink.rel = 'stylesheet';
  pipWindowLink.href = '/pip-window.css';
  pipWindow.document.head.appendChild(pipWindowLink);

  // Get screen and camera streams.
  const screenStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
  });
  const cameraStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // Create a video element to play the camera stream.
  const cameraVideo = document.createElement('video');
  cameraVideo.srcObject = cameraStream;
  cameraVideo.className = 'camera';
  cameraVideo.autoplay = true;
  cameraVideo.muted = true;

  // Insert the camera video element into the Picture-in-Picture window.
  pipWindow.document.body.appendChild(cameraVideo);

  // Use MediaStreamTrackProcess to consume screen frames.
  const screenProcessor = new MediaStreamTrackProcessor({
    track: screenStream.getVideoTracks()[0],
  });

  // Read screen frames and save the latest one.
  let screenFrame;
  const screenReader = screenProcessor.readable.getReader();
  screenReader.read().then(function saveScreenFrame({ done, value: frame }) {
    screenFrame?.close();
    screenFrame = frame;
    if (done) {
      return;
    }
    return screenReader.read().then(saveScreenFrame);
  });

  // Use MediaStreamTrackProcessor to consume camera frames.
  const cameraProcessor = new MediaStreamTrackProcessor({
    track: cameraStream.getVideoTracks()[0],
  });

  // Create an OffscreenCanvas to combine the screen and camera frames.
  const canvas = new OffscreenCanvas(0, 0);
  const ctx = canvas.getContext('2d');

  // Use TransformStream to process the camera frames and combine them
  // with the latest screen frame.
  const transformer = new TransformStream({
    async transform(cameraFrame, controller) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (screenFrame) {
        canvas.width = screenFrame.displayWidth;
        canvas.height = screenFrame.displayHeight;
        ctx.drawImage(screenFrame, 0, 0);
      }

      // Draw the camera frame as a square in the bottom right corner
      // of the screen frame.
      ctx.drawImage(
        cameraFrame,
        (cameraFrame.displayWidth - cameraFrame.displayHeight) / 2,
        0,
        cameraFrame.displayHeight,
        cameraFrame.displayHeight,
        canvas.width - 280,
        canvas.height - 280,
        240,
        240
      );

      const newFrame = new VideoFrame(canvas, {
        timestamp: cameraFrame.timestamp,
      });
      cameraFrame.close();
      controller.enqueue(newFrame);
    },
  });

  // Use MediaStreamTrackGenerator to produce the composed frames.
  const composedGenerator = new MediaStreamTrackGenerator({ kind: 'video' });

  // Pipe the camera processor to the transformer and to the composed frames
  // generator.
  cameraProcessor.readable
    .pipeThrough(transformer)
    .pipeTo(composedGenerator.writable);

  // Create a new MediaStream that includes the composed MediaStreamTrack and
  // the audio tracks from the camera stream.
  const composedStream = new MediaStream([
    composedGenerator,
    ...cameraStream.getAudioTracks(),
  ]);

  // Add the recording button to the Picture-in-Picture window.
  const recordingButton = document.createElement('button');
  recordingButton.className = 'button--record';
  recordingButton.textContent = 'Start recording';

  pipWindow.document.body.appendChild(recordingButton);

  // Handle recording start and stop.
  let mediaRecorder;
  recordingButton.addEventListener('click', async () => {
    if (recordingButton.textContent === 'Start recording') {
      recordingButton.textContent = 'Stop recording';

      // Use a MediaRecorder that will record the composedStream.
      mediaRecorder = new MediaRecorder(composedStream, {
        mimeType: 'video/webm;codecs=vp9',
      });

      // Store every available chunk into an array
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      // When the media recorder stops, download the recording as
      // a webm file.
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { tyme: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recording.webm';
        link.click();
        window.URL.revokeObjectURL(url);
      };

      // Start the recording.
      mediaRecorder.start();
    } else {
      recordingButton.textContent = 'Start recording';

      // Stop the recording.
      mediaRecorder.stop();
    }
  });
});
