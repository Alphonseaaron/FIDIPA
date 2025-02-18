export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: Date;
  status: 'draft' | 'published' | 'rejected';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}