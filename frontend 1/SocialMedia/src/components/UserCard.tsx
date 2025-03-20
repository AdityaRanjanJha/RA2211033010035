import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { UserWithPostCount } from '../types'
import { getRandomUserImage } from '../utils/helpers';

interface UserCardProps {
  user: UserWithPostCount;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, height: '100px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {user.postCount} posts
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '30%' }}
        image={getRandomUserImage(user.id)}
        alt={user.name}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {rank}
      </Box>
    </Card>
  );
};

export default UserCard;
