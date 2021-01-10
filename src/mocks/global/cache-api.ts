type CacheMap = WeakMap<Request, Response>;

var cacheApiMock = (function () {
  const _storage = new Map<string, CacheMap>();

  async function open(key: string) {
    let _cache: CacheMap;

    if (_storage.has(key)) {
      _cache = _storage.get(key)!;
    } else {
      _cache = new WeakMap();
      _storage.set(key, _cache);
    }

    return {
      async put(request: Request, response: Response): Promise<void> {
        _cache.set(request, response);
      },
      async match(request: Request): Promise<Response | undefined> {
        return _cache.get(request);
      },
      async delete(request: Request): Promise<void> {
        _cache.delete(request);
      },
    };
  }

  return {
    open,
  };
})();

// Mock cacheStorage in `window`
Object.defineProperty(window, 'caches', { value: cacheApiMock });

// Treat this file as ES module.
export {};
