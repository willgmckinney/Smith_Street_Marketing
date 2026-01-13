import { Link } from "@tanstack/react-router";
import React from "react";
import { SummitButton } from "../../components/Summit/SummitButton";
import { blogPosts } from "../../data/blogPosts";

interface BlogPostPageProps {
  postId: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId }) => {
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog">
          <SummitButton>Back to Blog</SummitButton>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-24 pb-20">
      {/* Header Image/Background */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-horizon z-10" />
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-atmospheric-haze" />
        )}

        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-deep-horizon bg-golden-hour-start rounded-full shadow-lg">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                  {/* Placeholder for author image - could add to data later */}
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    👤
                  </div>
                </div>
                <span className="font-semibold">{post.author}</span>
              </div>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg prose-invert max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-golden-hour-start prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-blockquote:border-l-golden-hour-start prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                prose-table:text-gray-300 prose-th:text-white prose-td:text-gray-300
                prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300
                prose-h2:text-white prose-h3:text-white prose-h2:mt-8 prose-h3:mt-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer of the article */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link to="/blog">
            <SummitButton variant="secondary">← Back to All Posts</SummitButton>
          </Link>
        </div>
      </div>
    </article>
  );
};
