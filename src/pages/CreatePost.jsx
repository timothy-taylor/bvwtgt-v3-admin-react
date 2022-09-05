import { useState } from "react";
import { useGetSupabase } from "../hooks/useGetSupabase";
import api from "../api/";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Error, Loading } from "../components/LoadingError.jsx";

const defaultState = { title: "", content: "", tag_id: "" };
export const CreatePost = () => {
  const { data: tags, loading, error } = useGetSupabase(api.readTags);
  const [post, setPost] = useState(defaultState);

  const updatePost = (cur) => setPost((prev) => ({ ...prev, ...cur }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = api.createPost(post);
    if (typeof response !== "undefined") setPost(defaultState);
  };

  if (loading) return <Loading label="tags" />;
  if (error) return <Error error={error} />;
  return (
    <Layout nav={true}>
      <Form label="Create post" handleSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={post.title}
          onChange={(e) => updatePost({ title: e.target.value })}
        />
        <textarea
          className="h-44"
          placeholder="content"
          value={post.content}
          onChange={(e) => updatePost({ content: e.target.value })}
        />
        <select
          value={post.tag_id}
          onChange={(e) => updatePost({ tag_id: e.target.value })}
        >
          <option value="">--choose a tag--</option>
          {tags.map((e) => (
            <option key={e.name} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </Form>
    </Layout>

  );
};
