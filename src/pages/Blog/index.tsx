import { blogPosts } from "../../data/blogPosts";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BlogCard } from "./Components/BlogCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <BlueprintGrid opacity={0.5} />

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <SpecLabel className="mb-4">insights</SpecLabel>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-chalk mb-6 pb-2.5">
          Insights & Updates
        </h1>
        <DimensionLine className="max-w-xs mx-auto mb-6" />
        <p className="text-xl text-chalk/70 max-w-2xl mx-auto">
          Notes on technology, data, and building systems that last, from the
          team at SAI.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
