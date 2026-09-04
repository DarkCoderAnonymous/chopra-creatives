"use client";

import { useSyncExternalStore } from "react";

let cachedSupport: boolean | null = null;

function detectWebgl(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedSupport = Boolean(gl);
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

export function useWebglSupport() {
  return useSyncExternalStore(subscribe, detectWebgl, getServerSnapshot);
}
