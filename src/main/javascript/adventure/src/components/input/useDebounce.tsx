import { useRef } from "react";

function useDebounce (input: any, delay: any) {
  const timeoutId = useRef();

  return function (...args: any[]) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    // @ts-ignore
    timeoutId.current = setTimeout(
      () => input(...args), delay
    )
  }
}

export default useDebounce;
