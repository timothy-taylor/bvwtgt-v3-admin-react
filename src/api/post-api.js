import { supabase } from "./supabase-client";
import { getIsoDateNow } from "../utils/get-iso-date-now.js";

const buildPostEntity = (post) => {
  let created_at, updated_at;
  created_at = updated_at = getIsoDateNow();
  return { ...post, created_at, updated_at };
}

export const postAPI = {
  create: async (post) => {
    //
    // not sure if supabase can automatically handle timestamps,
    // so create them manually here.
    const postEntity = buildPostEntity(post);
    try {
      const { data: post } = await supabase
        .from("posts")
        .insert([postEntity])
        .select();

      return post;
    } catch (err) {
      console.error(err);
    }
  },
};
