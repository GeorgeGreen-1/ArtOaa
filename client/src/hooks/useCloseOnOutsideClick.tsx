import { useEffect } from "react";

export const useCloseOnOutsideClick = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refs: React.RefObject<any>[],
  callback: () => void,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    const isOutside = refs.every(
      (ref) => ref.current && !ref.current.contains(event.target),
    );

    if (isOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
