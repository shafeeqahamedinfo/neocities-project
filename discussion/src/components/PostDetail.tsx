import React, { useState } from 'react';
import { ArrowLeft, User, Clock, MessageCircle, Send } from 'lucide-react';
import { Post, Reply } from '../types';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onReply: (content: string, postId: string) => void;
  currentUser: { name: string; type: 'student' | 'teacher' };
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onReply, currentUser }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleString();
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onReply(replyContent.trim(), post.id);
    setReplyContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to discussions</span>
        </button>

        {/* Main Post */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                post.authorType === 'student' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{post.author}</h2>
                <p className={`text-sm capitalize ${
                  post.authorType === 'student' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {post.authorType}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatTime(post.timestamp)}</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {post.subject}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed">{post.description}</p>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-800">
              Replies ({post.replies.length})
            </h3>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                currentUser.type === 'student' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Reply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Replies List */}
          <div className="space-y-6">
            {post.replies.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No replies yet. Be the first to help!</p>
              </div>
            ) : (
              post.replies.map((reply) => (
                <div key={reply.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    reply.authorType === 'student' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{reply.author}</p>
                        <p className={`text-xs capitalize ${
                          reply.authorType === 'student' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {reply.authorType}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{formatTime(reply.timestamp)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};