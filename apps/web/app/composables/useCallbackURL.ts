export const useCallbackURL = () => {
  const createCallbackURL = (path: string) => {
    const url = useRequestURL();
    const callback = new URL(path, url.origin).href;

    return callback;
  };

  return { createCallbackURL };
};
