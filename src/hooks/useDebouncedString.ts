import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useDebouncedString(
  parameter: {
    initialString: string;
    delay: number;
  } = { initialString: "", delay: 500 }
) {
  const { initialString, delay } = parameter;
  const [debouncingString, setDebouncingString] =
    useState<string>(initialString);
  const [resultString, setResultString] = useState<string>(initialString);
  useEffect(() => {
    const timeoutId = setTimeout(
      () => setResultString(debouncingString),
      delay
    );
    return () => clearTimeout(timeoutId);
  }, [debouncingString, delay]);
  return {
    debouncingString,
    resultString,
    setDebouncingString,
    setResultString,
  };
}

export default useDebouncedString;
