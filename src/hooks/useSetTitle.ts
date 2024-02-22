import { useEffect } from "react";

function useSetTitle(title?: string | ((defaultTitle: string) => string)) {
  useEffect(() => {
    if (title) {
      const defaultTitle = document.title;
      const newTitle = typeof title === "string" ? title : title(defaultTitle);
      document.title = newTitle;
      return () => {
        document.title = defaultTitle;
      };
    }
  }, [title]);
  return null;
}

export default useSetTitle;
