import { useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
