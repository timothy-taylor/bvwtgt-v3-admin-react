import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSupabase } from "../hooks/useGetSupabase";
import { DeleteButton, Form, Label } from "../components/Form";
import { Error, Loading } from "../components/LoadingError.jsx";
import { queries } from "../lib/queries.js";
import { buildPostEntity, defaultPost } from "../lib/data-structures.js";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(defaultPost);
  const fetchedPost = useGetSupabase(() => queries.read("posts", id));
  const fetchedTags = useGetSupabase(() => queries.read("tags"));

  const updatePost = (cur) => setPost((prev) => ({ ...prev, ...cur }));

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await queries.delete("posts", id);
      navigate("/posts");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const postEntity = buildPostEntity(post);
    const response = queries.update("posts", id, postEntity);
    if (typeof response !== "undefined") alert("post updated");
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const { id, title, content, tag_id, created_at } = fetchedPost.data;
      updatePost({ id, title, content, tag_id, created_at });
    }

    return () => {
      ignore = true;
    };
  }, [fetchedPost.data, id]);

  if (fetchedPost.loading || fetchedTags.loading) return <Loading label="post" />;
  if (fetchedTags.error || fetchedPost.error) return <Error />;
  return (
    <Layout nav={true}>
      <Form label="Update post" handleSubmit={handleSubmit}>
        <Label text="title">
          <input
            type="text"
            value={post.title}
            onChange={(e) => updatePost({ title: e.target.value })}
          />
        </Label>
        <Label text="content">
          <textarea
            className="h-96"
            value={post.content}
            onChange={(e) => updatePost({ content: e.target.value })}
          />
        </Label>
        <Label text="tag">
          <select
            value={post.tag_id}
            onChange={(e) => updatePost({ tag_id: e.target.value })}
          >
            <option value="">--choose a tag--</option>
            {fetchedTags.data.map((e) => (
              <option key={e.name} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </Label>
      </Form>
      <DeleteButton handeClick={handleDelete} />
    </Layout>
  );
};
