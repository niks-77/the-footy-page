class SimpleCache {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Set a value in the cache.
     * @param {string} key - Unique key for the cached data.
     * @param {any} value - The data to store.
     * @param {number} ttlInSeconds - Time To Live in seconds (default 300s / 5m).
     */
    set(key, value, ttlInSeconds = 300) {
        const expiresAt = Date.now() + ttlInSeconds * 1000;
        this.cache.set(key, { value, expiresAt });
    }

    /**
     * Get a value from the cache.
     * @param {string} key - Unique key for the cached data.
     * @returns {any|null} The cached data or null if not found/expired.
     */
    get(key) {
        const data = this.cache.get(key);
        if (!data) return null;

        if (Date.now() > data.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return data.value;
    }

    /**
     * Delete a specific key from the cache.
     * @param {string} key 
     */
    del(key) {
        this.cache.delete(key);
    }

    /**
     * Clear all cached data.
     */
    clear() {
        this.cache.clear();
    }
}

// Export a single instance to be shared across the backend
export default new SimpleCache();
