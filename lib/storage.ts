'use client';

export function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function exportAll() {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    data[k] = JSON.parse(localStorage.getItem(k) || "null");
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'flow-studio-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importAll(file: File, cb?: ()=>void) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      Object.entries(data).forEach(([k, v]) => {
        localStorage.setItem(k, JSON.stringify(v));
      });
      cb && cb();
    } catch {}
  };
  reader.readAsText(file);
}
