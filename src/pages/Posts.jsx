import { Link } from "react-router-dom";
import { useGetSupabase } from "../hooks/useGetSupabase";
import { Layout } from "../components/Layout";
import { queries } from "../lib/queries.js";
import { Error, Loading } from "../components/LoadingError.jsx";

export const Posts = () => {
  const { data: posts, loading, error } = useGetSupabase(() => queries.read("posts"));

  if (loading) return <Loading label="posts" />
  if (error) return <Error />
  return (
    <Layout nav={true}>
      {(posts || []).map((post, i) => (
        <Link className="block hover:underline" key={`${i}${post.title}`} to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </Layout>
  );
};
