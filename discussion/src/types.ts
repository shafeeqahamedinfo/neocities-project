export interface Post {
  id: string;
  title: string;
  subject: string;
  description: string;
  author: string;
  authorType: 'student' | 'teacher';
  timestamp: Date;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorType: 'student' | 'teacher';
  timestamp: Date;
  postId: string;
}

export interface User {
  name: string;
  type: 'student' | 'teacher';
}