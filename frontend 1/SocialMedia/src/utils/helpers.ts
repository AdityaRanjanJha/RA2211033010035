// Generate a random image URL for users
export const getRandomUserImage = (userId: string): string => {
    return `https://randomuser.me/api/portraits/${parseInt(userId) % 2 === 0 ? 'men' : 'women'}/${parseInt(userId) % 70}.jpg`;
  };
  
  // Generate a random image URL for posts
  export const getRandomPostImage = (postId: number): string => {
    return `https://picsum.photos/seed/${postId}/400/300`;
  };
  
  // Extract content keywords for image generation
  export const getImageFromContent = (content: string): string => {
    const keyword = content.split(' ').pop() || 'random';
    return `https://source.unsplash.com/400x300/?${keyword}`;
  };
  