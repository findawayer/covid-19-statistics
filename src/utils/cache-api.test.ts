import { readCache, writeCache } from './cache-api';

describe('Cache api', () => {
  const cacheKey = 'TEST';
  const request = new Request('/');
  const response = new Response('...');

  it('should be able to read and write cache HTTP responses', async () => {
    await writeCache(cacheKey, request, response);
    const cached = await readCache(cacheKey, request);
    expect(cached).toBe(response);
  });
});
