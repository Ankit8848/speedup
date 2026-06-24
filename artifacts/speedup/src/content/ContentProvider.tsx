/**
 * Loads site content from the API once and exposes a `useSection` hook that
 * returns a section's content merged over its registry default. The public
 * site reads everything through this, so an admin's saved overrides appear
 * without any component knowing where the data came from.
 */
import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULTS } from "./registry";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

type ContentMap = Record<string, Record<string, unknown>>;

const ContentContext = createContext<ContentMap>({});

async function fetchContent(): Promise<ContentMap> {
  const res = await fetch(`${API_BASE}/content`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to load content: ${res.status}`);
  return (await res.json()) as ContentMap;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  // Content is non-critical: render defaults immediately, swap in overrides
  // when they arrive. Never block the site on this request.
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchContent,
    staleTime: 60_000,
  });

  return (
    <ContentContext.Provider value={data ?? {}}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * Returns the content object for a section, with the registry default as the
 * base so any field the admin hasn't overridden still has a sensible value.
 * Typed loosely; callers cast to their section's shape.
 */
export function useSection<T = Record<string, any>>(key: string): T {
  const overrides = useContext(ContentContext);
  const base = DEFAULTS[key] ?? {};
  const override = overrides[key] ?? {};
  return { ...base, ...override } as T;
}
