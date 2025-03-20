export interface User {
    id: string;
    name: string;
  }
  
  export interface Post {
    id: number;
    userid: string;
    content: string;
    commentCount?: number;
    timestamp?: number;
  }
  
  export interface Comment {
    id: number;
    postid: number;
    content: string;
  }
  
  export interface UserWithPostCount extends User {
    postCount: number;
  }
  
  export interface PostWithComments extends Post {
    comments: Comment[];
    user?: string;
  }
  