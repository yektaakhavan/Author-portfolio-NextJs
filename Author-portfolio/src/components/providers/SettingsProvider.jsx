"use client";

import { createContext, useContext } from "react";
import defaultSettings from "@/data/defaultSettings";
import { useLiveData } from "@/hooks/useLiveData";
import { api } from "@/lib/api";

const SettingsContext = createContext(defaultSettings);

// Defined once so useLiveData gets a stable fetcher.
const fetchSettings = () => api.getSettings().then((settings) => ({ ...defaultSettings, ...settings }));

/** Makes the editable site settings (contact info, socials) available to every component below it. */
export function SettingsProvider({ initialSettings, children }) {
  const settings = useLiveData(fetchSettings, initialSettings);
  return <SettingsContext value={settings}>{children}</SettingsContext>;
}

export const useSettings = () => useContext(SettingsContext);
