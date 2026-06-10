import { blogPosts } from "../../data/blogPosts";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BlogCard } from "./Components/BlogCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <div className="relative bg-drafting-surface py-2cell border-b border-chalk/10 overflow-hidden">
        <BlueprintGrid opacity={0.55} />
        <div className="max-w-7xl mx-auto px-cell relative z-10">
          <SpecLabel className="mb-cell">field notes</SpecLabel>
          <div className="flex items-start gap-4 sm:gap-cell">
            <span className="font-mono text-label-mono text-marker-start mt-2">
              03
            </span>
            <div>
              <h1 className="font-display text-display-2 text-chalk font-extrabold leading-[0.95]">
                The
                <br />
                notes
              </h1>
              <DimensionLine
                reveal
                label="articles published"
                className="max-w-xs my-6"
              />
              <p className="font-sans text-body text-chalk/70 max-w-2xl">
                Notes on technology, data, and building systems that last, from
                the team at SAI.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-cell py-2cell">
        <SpecLabel className="mb-cell">recent writing</SpecLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-cell">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
