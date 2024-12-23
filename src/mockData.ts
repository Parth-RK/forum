// src/mockData.ts
import { Post } from './types';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Mock Post',
    content: 'This is a mock post.',
    user: {
        id: '1',
        avatar: 'https://example.com/avatar1.png',
        name: 'User One',
    },
    createdAt: '2023-01-01T00:00:00Z',
    likes: 10,
    comments: [
        {id: '1',
        user: {
            id: '2',
            avatar: 'https://example.com/avatar2.png',
            name: 'User Two',
        },
        content: 'This is a comment.',
        createdAt: '2023-01-01T00:00:00Z',
        likes: 5
        },
    ],
    category: 'question',
  },
  // Add more mock posts here
];

export default mockPosts;