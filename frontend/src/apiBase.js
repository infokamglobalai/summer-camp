/**
 * Base URL for backend API (no trailing slash).
 * - If VITE_API_BASE_URL is set, use it.
 * - In local dev with no env, use '' so requests go to the same origin and Vite proxies /api → localhost:5000.
 * - Production builds without env fall back to localhost (set VITE_API_BASE_URL for live API).
 */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (raw != null && String(raw).trim() !== '') {
    return String(raw).replace(/\/+$/, '');
  }
  if (import.meta.env.DEV) {
    return '';
  }
  return 'http://localhost:5000';
}
