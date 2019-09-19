import { useState, useEffect, useCallback } from "react";

/**
 * https://stackoverflow.com/questions/48048957/react-long-press-event
 */
export default function useLongPress(callback = () => {}, ms = 500) {
  const [isStartedLongPress, setIsStartedLongPress] = useState(false);

  useEffect(() => {
    let timerId: number;
    if (isStartedLongPress) {
      timerId = setTimeout(callback, ms);
    }
    return () => {
      clearTimeout(timerId);
    };
  });

  const start = useCallback(() => {
    setIsStartedLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setIsStartedLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: stop,
  };
}
