import { supabase } from '../lib/supabase';
import { Post, Reply } from '../types';

export const postService = {
  // Fetch all posts with their replies
  async getAllPosts(): Promise<Post[]> {
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      throw postsError;
    }

    const { data: replies, error: repliesError } = await supabase
      .from('replies')
      .select('*')
      .order('created_at', { ascending: true });

    if (repliesError) {
      console.error('Error fetching replies:', repliesError);
      throw repliesError;
    }

    // Group replies by post_id
    const repliesByPostId = replies?.reduce((acc, reply) => {
      if (!acc[reply.post_id]) {
        acc[reply.post_id] = [];
      }
      acc[reply.post_id].push({
        id: reply.id,
        content: reply.content,
        author: reply.author,
        authorType: reply.author_type as 'student' | 'teacher',
        timestamp: new Date(reply.created_at),
        postId: reply.post_id
      });
      return acc;
    }, {} as Record<string, Reply[]>) || {};

    // Combine posts with their replies
    return posts?.map(post => ({
      id: post.id,
      title: post.title,
      subject: post.subject,
      description: post.description,
      author: post.author,
      authorType: post.author_type as 'student' | 'teacher',
      timestamp: new Date(post.created_at),
      replies: repliesByPostId[post.id] || []
    })) || [];
  },

  // Create a new post
  async createPost(post: Omit<Post, 'id' | 'timestamp' | 'replies'>): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        subject: post.subject,
        description: post.description,
        author: post.author,
        author_type: post.authorType
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      subject: data.subject,
      description: data.description,
      author: data.author,
      authorType: data.author_type as 'student' | 'teacher',
      timestamp: new Date(data.created_at),
      replies: []
    };
  },

  // Create a new reply
  async createReply(reply: Omit<Reply, 'id' | 'timestamp'>): Promise<Reply> {
    const { data, error } = await supabase
      .from('replies')
      .insert({
        content: reply.content,
        author: reply.author,
        author_type: reply.authorType,
        post_id: reply.postId
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating reply:', error);
      throw error;
    }

    return {
      id: data.id,
      content: data.content,
      author: data.author,
      authorType: data.author_type as 'student' | 'teacher',
      timestamp: new Date(data.created_at),
      postId: data.post_id
    };
  },

  // Subscribe to real-time updates
  subscribeToUpdates(callback: () => void) {
    const postsSubscription = supabase
      .channel('posts-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' }, 
        callback
      )
      .subscribe();

    const repliesSubscription = supabase
      .channel('replies-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'replies' }, 
        callback
      )
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
      repliesSubscription.unsubscribe();
    };
  }
};