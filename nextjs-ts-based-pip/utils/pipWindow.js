export const ctxPip = async () => {
  const pipWindow = await documentPictureInPicture?.requestWindow();
  return pipWindow;
};
