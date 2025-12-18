import { Link } from "@tanstack/react-router";
import React from "react";
import { SummitButton } from "../../../components/Summit/SummitButton";
import { SummitCard } from "../../../components/Summit/SummitCard";
import { BlogPost } from "../../../data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <SummitCard className="h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden rounded-t-card">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-deep-horizon flex items-center justify-center">
            <span className="text-4xl">📄</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold text-deep-horizon bg-golden-hour-start rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl font-display font-bold text-granite mb-3 group-hover:text-golden-hour-start transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          <Link
            to="/blog/$postId"
            params={{ postId: post.id }}
            className="w-full"
          >
            <SummitButton variant="secondary" className="w-full justify-center">
              Read Article
            </SummitButton>
          </Link>
        </div>
      </div>
    </SummitCard>
  );
};
