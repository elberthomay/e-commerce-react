import { Dispatch, useEffect, useRef, useState } from "react";

function useDelayedState<T>(
  initialState: T,
  delay: number
): [T, T, Dispatch<React.SetStateAction<T>>, (newDelayed: T) => void] {
  const [state, setState] = useState<T>(initialState);
  const [delayed, setDelayed] = useState<T>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  function handleChangeDelayed(newDelayed: T) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
    setState(newDelayed);
    setDelayed(newDelayed);
  }
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDelayed(state), delay);
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    };
  }, [state, delay]);
  return [state, delayed, setState, handleChangeDelayed];
}

export default useDelayedState;
