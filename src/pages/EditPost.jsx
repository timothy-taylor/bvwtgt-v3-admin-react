import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSupabase } from "../hooks/useGetSupabase";
import { Form, Label } from "../components/Form";
import api from "../api/";
import { Error, Loading } from "../components/LoadingError.jsx";

const defaultState = { title: "", content: "", tag_id: "" };
export const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(defaultState);
  const {
    data,
    loading: loadingPost,
    error: errorPost,
  } = useGetSupabase(() => api.readPost(id));
  const {
    data: tags,
    loading: loadingTags,
    error: errorTags,
  } = useGetSupabase(api.readTags);

  const updatePost = (cur) => setPost((prev) => ({ ...prev, ...cur }));
  const handleSubmit = (e) => {
    e.preventDefault();

    const response = api.updatePost(id, post);
    if (typeof response !== "undefined") console.log("post updated");
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const { id, title, content, tag_id, created_at } = data;
      updatePost({ id, title, content, tag_id, created_at });
    }

    return () => {
      ignore = true;
    };
  }, [data]);

  if (loadingPost || loadingTags) return <Loading label="post" />;
  if (errorTags || errorPost) return <Error error={{...errorPost, ...errorTags}} />;
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
            {tags.map((e) => (
              <option key={e.name} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </Label>
      </Form>
    </Layout>
  );
};
