import axios from 'axios';
import { User, Post, Comment } from '../types';

const BASE_URL = 'http://20.244.56.144/test';

export const fetchUsers = async (): Promise<Record<string, string>> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};
