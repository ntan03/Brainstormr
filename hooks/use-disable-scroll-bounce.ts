import { useEffect } from "react";

export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");

    // Unmount callback
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};
