import { useEffect, useRef } from "react";

const speed = 0.1;
const topDistance = 500;
const maxOblation = 0.5;

function CursorFollowingCircle() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const cursorRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const positionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function tick() {
      const deltaX = cursorRef.current.x - positionRef.current.x;
      const deltaY = cursorRef.current.y - positionRef.current.y;

      const angleRad = Math.atan(deltaX / -deltaY);
      const rotation = (angleRad * 180) / Math.PI;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const scale = Math.min(distance / topDistance, 1);

      positionRef.current = {
        x: positionRef.current.x + deltaX * speed,
        y: positionRef.current.y + deltaY * speed,
      };

      divRef.current?.style.setProperty(
        "--position-x",
        `${Math.floor(positionRef.current.x)}px`
      );
      divRef.current?.style.setProperty(
        "--position-y",
        `${Math.floor(positionRef.current.y)}px`
      );

      divRef.current?.style.setProperty(
        "--scale-x",
        `${(1 + maxOblation * scale).toFixed(2)}`
      );
      divRef.current?.style.setProperty(
        "--scale-y",
        `${(1 - maxOblation * scale).toFixed(2)}`
      );

      divRef.current?.style.setProperty(
        "--rotation",
        `${Math.floor(rotation + 90)}deg`
      );

      animationRef.current = requestAnimationFrame(tick);
    }

    function eventFunction(event: MouseEvent) {
      const { x, y } = event;
      cursorRef.current = { x, y };
    }

    document.addEventListener("mousemove", eventFunction);
    animationRef.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", eventFunction);
      cancelAnimationFrame(animationRef.current ?? 0);
      animationRef.current = null;
    };
  }, []);
  return (
    <div
      ref={divRef}
      className="fixed z-50 w-10 h-10 border border-black rounded-full -left-5 -top-5  translate-x-[var(--position-x)] translate-y-[var(--position-y)] scale-x-[var(--scale-x)] scale-y-[var(--scale-y)] rotate-[var(--rotation)] pointer-events-none"
    ></div>
  );
}

export default CursorFollowingCircle;
