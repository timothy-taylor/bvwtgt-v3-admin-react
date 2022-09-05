import { Link } from "react-router-dom";
import { useGetSupabase } from "../hooks/useGetSupabase";
import { Layout } from "../components/Layout";
import api from "../api/";
import { Error, Loading } from "../components/LoadingError.jsx";

export const GetPosts = () => {
  const { data: posts, loading, error } = useGetSupabase(api.readPosts);

  if (loading) return <Loading label="posts" />
  if (error) return <Error error={error} />
  return (
    <Layout nav={true}>
      {posts.map((e, i) => (
          <Link className="block" key={i} to={`/posts/${e.id}`}>
            {e.title}
          </Link>
        ))}
    </Layout>
  );
};
