import { differenceInSeconds, formatDistance } from "date-fns";
import { useEffect, useState } from "react";

function Timer({
  timeout,
  onTimeout,
}: {
  timeout: Date;
  onTimeout: () => void;
}) {
  const [timer, setTimer] = useState(differenceInSeconds(timeout, new Date()));
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (timer > 0)
      timeoutId = setTimeout(() => {
        if (timer === 1) onTimeout();
        setTimer((timer) => timer - 1);
      }, 1000);
    return () => clearTimeout(timeoutId);
  }, [timer, onTimeout]);
  console.log(timer);
  return (
    <span>
      {timer > 0
        ? `in ${formatDistance(new Date(), timeout, { includeSeconds: true })}`
        : "right now"}
    </span>
  );
}

export default Timer;
