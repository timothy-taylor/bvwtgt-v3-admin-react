import { useState } from "react";
import { useGetTags } from "../hooks/useGetTags.js";
import { postAPI } from "../api/post-api.js";
import { Form, Loading, Error } from "./Form";

const defaultState = { title: "", content: "", tag_id: "" };

export const CreatePost = () => {
  const { tags, loading, error } = useGetTags();
  const [post, setPost] = useState(defaultState);

  const updatePost = (cur) => setPost((prev) => ({ ...prev, cur }));
  const handleSubmit = (e) => {
    e.preventDefault();

    const response = postAPI.create(post);
    if (typeof response !== "undefined") setPost(defaultState);
  };

  if (loading) return <Loading label="tags" />;
  if (error) return <Error error={error} />;
  return (
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
  );
};
