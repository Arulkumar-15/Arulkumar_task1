import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from './api';

const POSTS_CACHE_KEY = '@posts_cache';
const POSTS_CACHE_TIMESTAMP_KEY = '@posts_cache_timestamp';

export const storageService = {
  /**
   * Save posts to AsyncStorage
   */
  savePosts: async (posts: Post[]): Promise<void> => {
    try {
      const postsJson = JSON.stringify(posts);
      await AsyncStorage.setItem(POSTS_CACHE_KEY, postsJson);
      await AsyncStorage.setItem(POSTS_CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error saving posts to storage:', error);
      throw error;
    }
  },

  /**
   * Load posts from AsyncStorage
   */
  loadPosts: async (): Promise<Post[] | null> => {
    try {
      const postsJson = await AsyncStorage.getItem(POSTS_CACHE_KEY);
      if (postsJson) {
        return JSON.parse(postsJson) as Post[];
      }
      return null;
    } catch (error) {
      console.error('Error loading posts from storage:', error);
      return null;
    }
  },

  /**
   * Get the timestamp when posts were last cached
   */
  getCacheTimestamp: async (): Promise<number | null> => {
    try {
      const timestamp = await AsyncStorage.getItem(POSTS_CACHE_TIMESTAMP_KEY);
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch (error) {
      console.error('Error getting cache timestamp:', error);
      return null;
    }
  },

  /**
   * Clear cached posts
   */
  clearCache: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(POSTS_CACHE_KEY);
      await AsyncStorage.removeItem(POSTS_CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};

