// src/types/index.ts

export interface User {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface Comment {
    id: string;
    user: User;
    content: string;
    createdAt: string;
    likes: number;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    user: User;
    createdAt: string;
    likes: number;
    comments: Comment[];
    category: 'question' | 'thought';
    images?: string[];
  }
  
  export type RootStackParamList = {
    Home: undefined;
    PostDetails: { postId: string };
    AddPost: undefined;
    ReportPost: { postId: string };
  };
  
  export type BottomTabParamList = {
    Questions: undefined;
    Thoughts: undefined;
  };