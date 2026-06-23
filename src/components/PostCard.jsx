import React from 'react';
import storageService from '../appwrite/storageService';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white border border-gray-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
        {featuredImage && (
          <div className="w-full flex justify-center mb-4">
            <img
              src={storageService.getFile(featuredImage)}
              alt={title}
              className="w-full rounded-xl object-cover"
            />
          </div>
        )}
        <h2
          className="text-xl font-bold"
          style={{
            color: '#111827' // Force dark gray/black
          }}
        >
          {title}
        </h2>

      </div>
    </Link>
  );
}

export default PostCard;