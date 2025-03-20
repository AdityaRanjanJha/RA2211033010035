import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';
import { Post, PostWithComments } from '../types';
import PostCard from './PostCard';

const Feed: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [users, setUsers] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
        
        // Fetch initial posts
        await updateFeed(usersData);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      updateFeed(users);
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const updateFeed = async (usersData: Record<string, string>) => {
    try {
      // Fetch all posts from all users
      const allPostsPromises: Promise<Post[]>[] = [];
      for (const userId of Object.keys(usersData)) {
        allPostsPromises.push(fetchUserPosts(userId));
      }
      
      const allPostsArrays = await Promise.all(allPostsPromises);
      const allPosts = allPostsArrays.flat();
      
      // Add timestamp to posts if not already present
      const postsWithTimestamp = allPosts.map(post => ({
        ...post,
        timestamp: post.timestamp || Date.now() - Math.floor(Math.random() * 1000000)
      }));
      
      // Sort posts by timestamp in descending order (newest first)
      const sortedPosts = postsWithTimestamp.sort((a, b) => 
        (b.timestamp || 0) - (a.timestamp || 0)
      );
      
      // Fetch comments for each post
      const postsWithCommentsPromises = sortedPosts.map(async (post) => {
        const comments = await fetchPostComments(post.id);
        return {
          ...post,
          comments,
          user: usersData[post.userid]
        };
      });
      
      const postsWithComments = await Promise.all(postsWithCommentsPromises);
      
      setPosts(postsWithComments);
    } catch (error) {
      console.error('Error updating feed:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Feed
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Feed;
