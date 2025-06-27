import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Post, Reply } from './types';
import { postService } from './services/postService';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: 'Anonymous User', type: 'student' as const });
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load posts from Supabase
  const loadPosts = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      
      const fetchedPosts = await postService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load discussions. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initialize data and set up real-time updates
  useEffect(() => {
    loadPosts();

    // Subscribe to real-time updates
    const unsubscribe = postService.subscribeToUpdates(() => {
      loadPosts(true);
    });

    return unsubscribe;
  }, []);

  const handleUserTypeChange = (type: 'student' | 'teacher') => {
    const name = type === 'student' ? 'Anonymous Student' : 'Anonymous Teacher';
    setCurrentUser({ name, type });
  };

  const handlePostSubmit = async (postData: Omit<Post, 'id' | 'timestamp' | 'replies'>) => {
    try {
      setError(null);
      await postService.createPost(postData);
      setShowPostForm(false);
      // Posts will be automatically updated via real-time subscription
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleReply = async (content: string, postId: string) => {
    try {
      setError(null);
      await postService.createReply({
        content,
        author: currentUser.name,
        authorType: currentUser.type,
        postId
      });
      // Replies will be automatically updated via real-time subscription
    } catch (err) {
      console.error('Error creating reply:', err);
      setError('Failed to post reply. Please try again.');
    }
  };

  const handleRefresh = () => {
    loadPosts(true);
  };

  const handlePostClick = (post: Post) => {
    // Find the latest version of the post (in case it has new replies)
    const updatedPost = posts.find(p => p.id === post.id) || post;
    setSelectedPost(updatedPost);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onReply={handleReply}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header currentUser={currentUser} onUserTypeChange={handleUserTypeChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Global Discussion Board</h1>
            <p className="text-gray-600">Connect with students and teachers worldwide - Ask questions, share knowledge, and learn together</p>
          </div>
          
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {showPostForm ? 'Cancel' : 'Ask Question'}
          </button>
        </div>

        {showPostForm && (
          <PostForm onSubmit={handlePostSubmit} currentUser={currentUser} />
        )}

        <PostList
          posts={posts}
          onPostClick={handlePostClick}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </main>
    </div>
  );
}

export default App;