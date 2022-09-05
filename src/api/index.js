import { supabase } from "./supabase-client";
import { getIsoDateNow } from "../utils/get-iso-date-now.js";

//
// building out data structure from post state
// we are handling database timestamps manually
const buildPostEntity = (post) => {
  //
  // if created_at exists, we are only updating a post
  if (post.created_at) {
    const updated_at = getIsoDateNow();
    return { ...post, updated_at };
  }

  let created_at, updated_at;
  created_at = updated_at = getIsoDateNow();
  return { ...post, created_at, updated_at };
};

const api = {
  createPost: async (post) => {
    //
    // since createPost() is used via form submit,
    // we handle errors here
    const postEntity = buildPostEntity(post);
    try {
      const { data } = await supabase
        .from("posts")
        .insert([postEntity])
        .select();

      return data;
    } catch (err) {
      console.error(err);
    }
  },
  //
  // these read calls are being consumed by a hook
  // with built-in data & error handling
  readPosts: () => supabase.from("posts").select("*"),
  readPost: (id) =>
    supabase.from("posts").select("*").eq("id", id).limit(1).single(),
  readTags: () => supabase.from("tags").select("*"),
  getUser: () => supabase.auth.getUser(),
  updatePost: async (id, post) => {
    const postEntity = buildPostEntity(post);
    try {
      const { data } = await supabase
        .from("posts")
        .update(postEntity)
        .eq("id", id)

      return data;
    } catch (err) {
      console.error(err);
    }
  },
};

export default api;
