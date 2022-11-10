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
  const fetchedTags = useGetSupabase(() => queries.read("tags"));
  const [post, setPost] = useState(defaultPost);

  const updatePost = (cur) => setPost((prev) => ({ ...prev, ...cur }));

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await queries.delete("posts", id);
      navigate("/posts");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postEntity = buildPostEntity(post);
    const response = await queries.update("posts", id, postEntity);
    if (typeof response !== "undefined") alert("post updated");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await queries.read("posts", id);
      const { title, content, tag_id, created_at } = fetchedPost.data;
      updatePost({ id, title, content, tag_id, created_at });
    }

    let ignore = false;
    if (!ignore) fetchPost().catch(error => console.error(error));
    return () => {
      ignore = true;
    };
  }, [id]);

  if (fetchedTags.loading) return <Loading label="post" />;
  if (fetchedTags.error) return <Error />;
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
      <DeleteButton handleClick={handleDelete} />
    </Layout>
  );
};
