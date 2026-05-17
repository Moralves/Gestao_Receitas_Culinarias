import { Injectable } from '@angular/core';

/**
 * Simple wrapper around localStorage to persist client-side data.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Reads and parses JSON values from storage.
   */
  read<T>(key: string, fallback: T): T {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  }

  /**
   * Serializes and writes values into storage.
   */
  write<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
