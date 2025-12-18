import { createRoute } from "@tanstack/react-router";
import { BlogPostPage } from "../../pages/Blog/BlogPostPage";
import { rootRoute } from "../__root";

export const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "blog/$postId",
  component: PostComponent,
});

function PostComponent() {
  const { postId } = blogPostRoute.useParams();
  return <BlogPostPage postId={postId} />;
}
