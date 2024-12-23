// src/redux/slices/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, Comment } from '../../types';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<{ id: string; updates: Partial<Post> }>) => {
      const post = state.posts.find(p => p.id === action.payload.id);
      if (post) {
        Object.assign(post, action.payload.updates);
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  addPost,
  removePost,
  updatePost,
  addComment,
  toggleLike,
  setLoading,
  setError,
} = postsSlice.actions;

export default postsSlice.reducer;
