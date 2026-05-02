import { useMemo } from "react";

export function useWebGLSupported(): boolean {
  return useMemo(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      return !!ctx;
    } catch {
      return false;
    }
  }, []);
}
