import { useEffect } from "react";

// Hook that alerts clicks outside of the passed ref
function useOutsideClickEvent(ref: any, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, callback]);
}

export default useOutsideClickEvent;
