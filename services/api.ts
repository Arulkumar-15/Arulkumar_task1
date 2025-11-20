import axios, { AxiosError } from 'axios';
import { storageService } from './storage';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    try {
      const response = await apiClient.get<Post[]>('/posts');
      const posts = response.data;
      
      // Save posts to AsyncStorage after successful fetch
      await storageService.savePosts(posts);
      
      return posts;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorCode = axiosError.code;
        const errorMessage = axiosError.message;
        
        if (errorCode === 'ECONNABORTED' || errorMessage.includes('timeout')) {
          throw new Error('Request timeout. Please check your internet connection.');
        }
        if (errorCode === 'ERR_NETWORK' || !axiosError.response) {
          throw new Error('No internet connection. Please check your network settings.');
        }
        if (axiosError.response) {
          const status = axiosError.response.status;
          const statusText = axiosError.response.statusText;
          throw new Error(`API Error: ${status} - ${statusText}`);
        }
      }
      throw new Error('An unexpected error occurred. Please try again.');
    }
  },
};

