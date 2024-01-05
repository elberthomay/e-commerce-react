import { useEffect, useState } from "react";
import {
  LG_BREAKPOINT,
  MD_BREAKPOINT,
  SM_BREAKPOINT,
  XL2_BREAKPOINT,
  XL_BREAKPOINT,
} from "../utilities/breakpointUtils";

function getWindowSize() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);
  return windowSize;
}

export function useMaxBreakpoints() {
  const { width } = useWindowSize();
  return {
    isSm: width >= SM_BREAKPOINT,
    isMd: width >= MD_BREAKPOINT,
    isLg: width >= LG_BREAKPOINT,
    isXl: width >= XL_BREAKPOINT,
    is2XL: width >= XL2_BREAKPOINT,
  };
}
