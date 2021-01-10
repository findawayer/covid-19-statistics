function canUseCache(): boolean {
  return 'caches' in window;
}

export async function readCache(
  key: string,
  request: Request,
): Promise<Response | undefined | null> {
  if (!canUseCache()) return null;
  const cache = await window.caches.open(key);
  return cache.match(request);
}

export async function writeCache(
  key: string,
  request: Request,
  response: Response,
): Promise<boolean> {
  if (!canUseCache()) return false;
  const cache = await window.caches.open(key);
  cache.put(request, response);
  return true;
}
