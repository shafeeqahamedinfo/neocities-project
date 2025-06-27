import React from 'react';
import { MessageCircle, Clock, User, BookOpen } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 p-6 group hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            post.authorType === 'student' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-green-100 text-green-600'
          }`}>
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.author}</p>
            <p className={`text-xs capitalize ${
              post.authorType === 'student' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {post.authorType}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">{formatTime(post.timestamp)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.replies.length}</span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {post.subject}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
        {post.description}
      </p>

      {post.replies.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Latest reply from {post.replies[post.replies.length - 1].author}
          </p>
        </div>
      )}
    </div>
  );
};