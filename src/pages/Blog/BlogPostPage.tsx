import { Link } from "@tanstack/react-router";
import React from "react";
import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { getBlogFigure } from "../../components/Blueprint/BlogDiagrams";
import { Seo } from "../../components/Seo";
import { blogPosts } from "../../data/blogPosts";

interface BlogPostPageProps {
  postId: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId }) => {
  const postIndex = blogPosts.findIndex((p) => p.id === postId);
  const post = postIndex >= 0 ? blogPosts[postIndex] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog">
          <BlueprintButton>Back to Blog</BlueprintButton>
        </Link>
      </div>
    );
  }

  const { Figure, caption } = getBlogFigure(post.id);
  const metaDescription =
    post.excerpt.length > 160 ? `${post.excerpt.slice(0, 157)}...` : post.excerpt;

  return (
    <article className="min-h-screen pt-24 pb-20">
      <Seo title={post.title} description={metaDescription} path={`/blog/${post.id}`} />
      {/* Editorial header + framed figure (the portfolio asset treatment) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-cell">
        <Link
          to="/blog"
          className="inline-block mb-cell font-mono text-label-mono lowercase text-chalk/50 transition-colors hover:text-marker-start"
        >
          ← writing
        </Link>
        <p className="font-mono text-label-mono lowercase text-marker-start mb-3">
          {post.category}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-chalk mb-cell leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label-mono lowercase text-chalk/45 mb-cell">
          <span className="text-chalk/70">{post.author}</span>
          <span aria-hidden>·</span>
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <AssetFrame figure={postIndex + 1} caption={caption}>
          <Figure className="w-full" />
        </AssetFrame>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-chalk
                prose-p:text-chalk/80 prose-p:leading-relaxed
                prose-a:text-marker-start prose-a:no-underline hover:prose-a:underline
                prose-strong:text-chalk
                prose-blockquote:border-l-marker-start prose-blockquote:bg-chalk/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                prose-table:text-chalk/80 prose-th:text-chalk prose-td:text-chalk/70
                prose-ul:text-chalk/80 prose-ol:text-chalk/80 prose-li:text-chalk/80
                prose-h2:text-chalk prose-h3:text-chalk prose-h2:mt-8 prose-h3:mt-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer of the article */}
        <div className="mt-16 pt-8 border-t border-chalk/10">
          <Link to="/blog">
            <BlueprintButton variant="secondary">← back to writing</BlueprintButton>
          </Link>
        </div>
      </div>

      <div className="mt-2cell">
        <CtaSection
          headline="Building something like this?"
          body="If this maps to a problem you have, let us scope it. Most engagements start with a 30-minute call, no commitment required."
        />
      </div>
    </article>
  );
};
