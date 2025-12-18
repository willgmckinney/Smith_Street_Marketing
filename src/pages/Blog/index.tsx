import { SummitButton } from "../../components/Summit/SummitButton";
import { blogPosts } from "../../data/blogPosts";
import { BlogCard } from "./Components/BlogCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
          Insights & Updates
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Thoughts on marketing, technology, and the future of digital business
          from the team at Smith Street Marketing.
        </p>
      </div>

      {/* Featured/Latest Post could go here, but keeping it simple grid for now */}

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Newsletter / CTA Section */}
      <div className="max-w-4xl mx-auto mt-24 text-center bg-atmospheric-haze/50 rounded-card p-12 border border-white/5">
        <h2 className="text-3xl font-display font-bold mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-300 mb-8">
          Get the latest insights delivered directly to your inbox. No spam,
          just value.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg bg-deep-horizon border border-gray-700 text-white focus:outline-none focus:border-golden-hour-start flex-grow"
          />
          <SummitButton>Subscribe</SummitButton>
        </div>
      </div>
    </div>
  );
}
