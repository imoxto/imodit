import { useEffect, useState } from "react";

const LOCAL_STORAGE_PREFIX = "imodit";

export function getStorageValue<T = any>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(getKey(key));

    if (typeof saved === "string") {
      try {
        return JSON.parse(saved);
      } catch (error) {
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export function setStorageValue<T = any>(key: string, value: T) {
  localStorage.setItem(getKey(key), JSON.stringify(value));
}

export function useLocalStorage<T = any>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() =>
    getStorageValue<T>(key, defaultValue)
  );

  useEffect(() => {
    setValue(getStorageValue<T>(key, defaultValue));
  }, [key, setValue, defaultValue]);

  useEffect(() => {
    setStorageValue<T>(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export function getKey(key: string) {
  return `${LOCAL_STORAGE_PREFIX}.${key}`;
}
