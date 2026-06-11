import { Link } from "@tanstack/react-router";
import React from "react";
import { BlogPost } from "../../../data/blogPosts";
import { getBlogFigure } from "../../../components/Blueprint/BlogDiagrams";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const fig = index !== undefined ? `n.${String(index).padStart(2, "0")}` : undefined;
  const { Figure } = getBlogFigure(post.id);

  return (
    <Link
      to="/blog/$postId"
      params={{ postId: post.id }}
      className="group flex h-full flex-col border border-chalk/15 rounded-spec bg-drafting-surface overflow-hidden transition-transform duration-150 ease-spec hover:-translate-y-px motion-reduce:transition-none"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-chalk/15 bg-blueprint-base p-5">
        <Figure className="w-full" />
        {/* faint blueprint grid draws over the figure on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-[length:16px_16px] opacity-0 transition-opacity duration-150 ease-spec group-hover:opacity-60 motion-reduce:transition-none motion-reduce:group-hover:opacity-0"
        />
        <span className="absolute left-3 top-3 border border-chalk/15 rounded-spec bg-drafting-surface px-2 py-1 font-mono text-label-mono lowercase text-marker-start">
          {post.category}
        </span>
      </div>

      <div className="flex flex-grow flex-col p-cell">
        <div className="mb-3 flex items-center gap-2.5 font-mono text-label-mono lowercase text-chalk/45">
          {fig && <span className="text-marker-start">{fig}</span>}
          <span aria-hidden className="h-px w-4 bg-marker-start/50" />
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="mb-3 font-display text-xl font-bold text-chalk transition-colors group-hover:text-marker-start">
          {post.title}
        </h3>

        <p className="mb-cell line-clamp-3 flex-grow font-sans text-sm text-chalk/70">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 font-mono text-label-mono lowercase text-marker-start">
          read note
          <span aria-hidden className="transition-transform duration-150 ease-spec group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
};
