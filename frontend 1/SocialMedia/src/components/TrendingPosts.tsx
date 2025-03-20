import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';
import { Post, PostWithComments } from '../types';
import PostCard from './PostCard';

const TrendingPosts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [trendingPosts, setTrendingPosts] = useState<PostWithComments[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        
        // Fetch all posts from all users
        const allPostsPromises: Promise<Post[]>[] = [];
        for (const userId of Object.keys(usersData)) {
          allPostsPromises.push(fetchUserPosts(userId));
        }
        
        const allPostsArrays = await Promise.all(allPostsPromises);
        const allPosts = allPostsArrays.flat();
        
        // Fetch comments for each post
        const postsWithCommentsPromises = allPosts.map(async (post) => {
          const comments = await fetchPostComments(post.id);
          return {
            ...post,
            comments,
            user: usersData[post.userid],
            commentCount: comments.length
          };
        });
        
        const postsWithComments = await Promise.all(postsWithCommentsPromises);
        
        // Find the maximum comment count
        const maxCommentCount = Math.max(...postsWithComments.map(post => post.commentCount || 0));
        
        // Filter posts with the maximum comment count
        const trending = postsWithComments.filter(post => post.commentCount === maxCommentCount);
        
        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Trending Posts
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {trendingPosts.length > 0 ? (
            trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Typography>No trending posts found.</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default TrendingPosts;
