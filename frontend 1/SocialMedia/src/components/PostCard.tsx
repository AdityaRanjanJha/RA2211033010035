import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { PostWithComments } from '../types';
import { getImageFromContent } from '../utils/helpers';

interface PostCardProps {
  post: PostWithComments;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={getImageFromContent(post.content)}
        alt={post.content}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By: {post.user || 'Unknown User'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Comments: {post.comments?.length || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
