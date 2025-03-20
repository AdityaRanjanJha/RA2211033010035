import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { fetchUsers, fetchUserPosts } from '../services/api';
import { UserWithPostCount } from '../types';
import UserCard from './UserCard';

const TopUsers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [topUsers, setTopUsers] = useState<UserWithPostCount[]>([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        
        // Create an array of promises to fetch posts for each user
        const userPromises = Object.entries(usersData).map(async ([id, name]) => {
          const posts = await fetchUserPosts(id);
          return {
            id,
            name,
            postCount: posts.length
          };
        });
        
        // Wait for all promises to resolve
        const usersWithPostCounts = await Promise.all(userPromises);
        
        // Sort users by post count in descending order and take top 5
        const sortedUsers = usersWithPostCounts
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);
        
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Top Users
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {topUsers.map((user, index) => (
            <UserCard key={user.id} user={user} rank={index + 1} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default TopUsers;
