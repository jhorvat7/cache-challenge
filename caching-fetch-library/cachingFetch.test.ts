import { serializeCache } from './cachingFetch';

describe('serializeCache', () => {
  test('serializes the cache to a JSON string', () => {
    const cache = {
      'https://example.com/data': { id: 1, name: 'Test' },
    };

    const serializedCache = serializeCache(cache);
    expect(serializedCache).toBe(JSON.stringify(cache));
  });
});